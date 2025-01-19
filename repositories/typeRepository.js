const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class TypeRepository {
    async getAllTypes() {
        try {
            const types = await  prisma.type.findMany({
                include: {
                    species: true, // Inclut les espèces liées
                },
            });

            return types;
        }catch (error){
            console.error('Erreur lors de la récupération des types',error);
            throw error;
        }
    }



    async getTypeById(typeId) {
        try {
            const type = await  prisma.type.findUnique({
                where: {
                    id: typeId,
                }
            });

            return type;
        }catch (error){
            console.error('Erreur lors de la récupération du type par son id',error);
            throw error;
        }
    }

    async updateType(data) {
        try {
            const type = await prisma.type.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    addressProposal: data.addressProposal,
                    species: {
                        set: data.species.map((id) => ({ id })), // Connecte les espèces existantes par leur ID
                    },
                },
                include: {
                    species: true,
                }
            });

            return type;
        }catch (error){
            console.error('Erreur lors de la modification du type',error);
            throw error;
        }
    }

    async addType(data) {
        try {
            const type = await prisma.type.create({
                data: {
                    name: data.name,
                    addressProposal: data.addressProposal,
                    species: {
                        connect: data.species.map((id) => ({ id })), // Connecte les espèces existantes par leur ID
                    },
                },
                include: {
                    species: true,
                }
            });


            return type;
        } catch (error) {
            console.error("Erreur lors de la création du type", error);
            throw error;
        }
    }

    async deleteTypeById(typeId) {
        try {
            const type = await prisma.type.delete({
                where : {
                    id: typeId,
                }
            });

            return type;
        } catch (error) {
            console.error("Erreur lors de la suppression du type", error);
            throw error;
        }
    }
}

module.exports = new TypeRepository();