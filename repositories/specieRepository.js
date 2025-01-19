const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class SpecieRepository {
    async checkSpecieExistById(specieId) {
        try {
            const specie = await prisma.specie.findUnique({
                where: {
                    id: specieId,
                },
            });

            return !!specie;
        } catch (error) {
            console.error("Erreur lors de la vérification de l'espèce par ID", error);
            throw error;
        }
    }

    async getAllSpecies() {
        try {
            const species = await prisma.specie.findMany({
                select: {
                    id: true,
                    name: true,
                },
            })

            return species;
        } catch (error) {
            console.error("Erreur lors de la récupération des espèces", error);
            throw error;
        }
    }

    async getAllSpeciesWithRaceCounts() {
        try {
            const species = await prisma.specie.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            races: true,
                        },
                    },
                }
            })

            return species;
        } catch (error) {
            console.error("Erreur lors de la récupération des espèces", error);
            throw error;
        }
    }

    async getAllSpeciesByTypeId(typeId) {
        try {
            const species = await prisma.specie.findMany({
                where: {
                    types: {
                        some: { id: typeId }, // Vérifie la relation avec le type donné
                    },
                },
            });

            return species;
        } catch (error) {
            console.error("Erreur lors de la récupération de l espèce d un type", error);
            throw error;
        }
    }

    async updateSpecie(data) {
        try {
            const specie = await prisma.specie.update({
                where: { id: data.id },
                data: data,
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            races: true,
                        },
                    },
                }
            });

            return specie;
        }catch (error){
            console.error('Erreur lors de la modification de l espèce', error);
            throw error;
        }
    }

    async addSpecie(data) {
        try {
            const specie = await prisma.specie.create({
                data: data,
            });

            return specie;
        } catch (error) {
            console.error("Erreur lors de la création de l espèce", error);
            throw error;
        }
    }

    async deleteSpecieById(specieId) {
        try {
            const specie = await prisma.specie.delete({
                where : {
                    id: Number(specieId),
                }
            });

            return specie;
        } catch (error) {
            console.error("Erreur lors de la suppression de l espèce", error);
            throw error;
        }
    }
}

module.exports = new SpecieRepository();
