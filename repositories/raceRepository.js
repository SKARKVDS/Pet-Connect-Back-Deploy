const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RaceRepository {
    async getAllRacesBySpecieId(SpecieId) {
        try {
            const races = await prisma.race.findMany({
                where: {
                    specieId: Number(SpecieId),  // Filtre pour le forum spécifique
                }
            })
            return races;
        } catch (error) {
            console.error('Erreur lors de la récupération des races d une espèce', error);
            throw error;
        }
    }

    async updateRace(data) {
        try {
            const race = await prisma.race.update({
                where: { id: data.id },
                data: data,
            });

            return race;
        }catch (error){
            console.error('Erreur lors de la modification de la race',error);
            throw error;
        }
    }

    async addRace(data) {
        try {
            const race = await prisma.race.create({
                data: data,
            });

            return race;
        } catch (error) {
            console.error("Erreur lors de la création de la race", error);
            throw error;
        }
    }

    async deleteRaceById(raceId) {
        try {
            const race = await prisma.race.delete({
                where : {
                    id: raceId,
                }
            });

            return race;
        } catch (error) {
            console.error("Erreur lors de la suppression de la race", error);
            throw error;
        }
    }
}

module.exports = new RaceRepository();
