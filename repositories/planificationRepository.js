const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PlanificationRepository {
    async getAllPlanificationsByProposalId(proposalId, dateTime) {
        try {
            const planifications = await prisma.planification.findMany({
                where: {
                    proposalId: proposalId,
                    dateTime: {
                        gt: dateTime,
                    }
                },
                include: {
                    requests: {
                        where: {
                            isAccepted: true,
                        },
                    },
                },
                orderBy: {
                    dateTime: 'desc', // Tri par dateTime décroissant
                },
            })

            const transformedPlanifications = planifications.map(planification => ({
                ...planification,
                dateTime: planification.dateTime.toString(),  // Convertir BigInt en string
            }))

            return transformedPlanifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des planifications', error);
            throw error;
        }
    }

    async getAllFuturePlanificationsByProposalId(proposalId, dateTime) {
        try {
            const planifications = await prisma.planification.findMany({
                where: {
                    proposalId: proposalId,
                    dateTime: {
                        gt: dateTime,
                    }
                },
            })

            const transformedPlanifications = planifications.map(planification => ({
                ...planification,
                dateTime: Number(planification.dateTime),  // Convertir BigInt en string
            }))

            return transformedPlanifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des planifications', error);
            throw error;
        }
    }

    async getPlanificationByProposalIdAndTimestamp(proposalId, timestamp) {
        try {
            const planifications = await prisma.planification.findMany({
                where: {
                    proposalId: proposalId,
                    dateTime: timestamp
                },
            })

            return planifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des planifications', error);
            throw error;
        }
    }


    async addPlanification(data) {
        try {
            const planification = await prisma.planification.create({
                data: data,
            });

            return planification;
        } catch (error) {
            console.error("Erreur lors de la création de la planification", error);
            throw error;
        }
    }

    async deletePlanification(data) {
        try {
            const planification = await prisma.planification.deleteMany({
                where : {
                    proposalId: data.proposalId,
                    dateTime: data.dateTime,
                }
            });

            return planification;
        } catch (error) {
            console.error("Erreur lors de la suppression de la planification", error);
            throw error;
        }
    }


    async clearExpiredPlanifications(dateTimeNow) {
        try {
            const planifications = await prisma.planification.deleteMany({
                where: {
                    dateTime: {
                        lt: dateTimeNow, // Utilisation correcte de l'opérateur Prisma
                    },
                    requests: {
                        every: {
                            isAccepted: false, // Vérifie que toutes les demandes associées ne sont pas acceptées
                        },
                    },
                },
            });

            return planifications;
        }catch (error){
            console.error('Erreur lors de la suppression des planifications expirées',error);
            throw error;
        }
    }
}

module.exports = new PlanificationRepository();
