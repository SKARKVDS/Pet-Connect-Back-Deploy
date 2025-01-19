const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const active = 1
const pause = 2
const stop = 3


class ProposalRepository {


    async checkProposalAccessibleByIdAndUserId(proposalId , userId) {
        try {
            const proposal = await  prisma.proposal.findUnique({
                where: {
                    id: proposalId,
                    userId: userId,
                }
            });

            return !!proposal;
        }catch (error){
            console.error('Erreur lors de la récupération des propositions d un utilisateur' ,error);
            throw error;
        }
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- GET CREATOR -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

    async getAllProposalsByUserIdAdmin(userId) {
        try {
            const proposals = await  prisma.proposal.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    type: true,
                    address: true,
                    species: true,
                    _count: {
                        select: {
                            planifications: true, // Compte les planifications associées
                        },
                    },
                }
            });

            return proposals;
        }catch (error){
            console.error('Erreur lors de la récupération des propositions d un utilisateur' ,error);
            throw error;
        }
    }

    async getAllProposalsByUserId(userId) {
        try {
            const proposals = await  prisma.proposal.findMany({
                where: {
                    userId: userId,
                    isDisable : false,
                },
                include: {
                    type: true,
                    address: true,
                    species: true,
                }
            });

            return proposals;
        }catch (error){
            console.error('Erreur lors de la récupération des propositions d un utilisateur' ,error);
            throw error;
        }
    }

    async getAllProposalsByTimestamp(timestamp, userId) {
        try {
            const proposals = await  prisma.proposal.findMany({
                where: {
                    userId: {
                        not: userId,
                    },
                    isDisable : false,
                    planifications: {
                        some: {
                            dateTime: timestamp, // Filtrer par timestamp
                            isDisplay: true,
                        },
                    },
                },
                include: {
                    type: true,
                    address: true,
                    species: true,
                    planifications: true,
                    user: {
                        include:{
                            badge: true,
                        }
                    }
                }
            });

            return proposals;
        }catch (error){
            console.error('Erreur lors de la récupération des propositions d un utilisateur' ,error);
            throw error;
        }
    }

    async updateProposalAdmin(data) {
        try {
            const proposal = await prisma.proposal.update({
                where: {
                    id: data.id,
                },
                data: data,
                include: {
                    type: true,
                    address: true,
                    species: true,
                    _count: {
                        select: {
                            planifications: true, // Compte les planifications associées
                        },
                    },
                }
            });


            return proposal;
        }catch (error){
            console.error('Erreur lors de la création de la proposition',error);
            throw error;
        }
    }


    async updateProposal(data) {
        try {
            const proposal = await prisma.proposal.update({
                where: {
                    id: data.id,
                },
                data: data,
                include: {
                    type: true,
                    address: true,
                    species: true,
                }
            });


            return proposal;
        }catch (error){
            console.error('Erreur lors de la création de la proposition',error);
            throw error;
        }
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- CREATE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    async addProposal(data) {
        try {
            const proposal = await prisma.proposal.create({
                data: {
                    description: data.description,
                    userId: data.userId,
                    typeId : data.typeId,
                    isDisable : false,
                    addressId : data.addressId, //todo
                    species: {
                        connect: data.species.map((id) => ({ id })), // Connecte les espèces existantes par leur ID
                    },
                },

            });


            return proposal;
        }catch (error){
            console.error('Erreur lors de la création de la proposition',error);
            throw error;
        }
    }

    async deleteProposalById(proposalId) {
        try {
            const proposal = await prisma.proposal.delete({
                where : {
                    id: Number(proposalId),
                }
            });

            return proposal;
        } catch (error) {
            console.error("Erreur lors de la suppression de l espèce", error);
            throw error;
        }
    }
}

module.exports = new ProposalRepository();