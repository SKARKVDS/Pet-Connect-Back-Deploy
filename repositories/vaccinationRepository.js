const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VaccinationRepository {

    async getAllFutureVaccinationsByUserId(userId) {
        try {
            const vaccinations = await prisma.vaccination.findMany({
                where: {
                    pet: {
                        userId: userId,
                    },
                    vaccine:{
                        needBooster: true,
                    }
                },
                include:{
                    vaccine: true,
                    pet: true,
                }
            })

            const transformedVaccinations = vaccinations.map(vaccination => ({
                ...vaccination,
                dateVaccination: Number(vaccination.dateVaccination), // Convertir BigInt en string
                dateBooster: Number(vaccination.dateBooster),      // Convertir BigInt en string
            }));

            return transformedVaccinations;
        } catch (error) {
            console.error('Erreur lors de la récupération des vaccinations d un pet', error);
            throw error;
        }
    }

    async getAllVaccinationsByPetId(petId) {
        try {
            const vaccinations = await prisma.vaccination.findMany({
                where: {
                    petId: petId
                },
                include:{
                    vaccine: true
                }
            })

            const transformedVaccinations = vaccinations.map(vaccination => ({
                ...vaccination,
                dateVaccination: Number(vaccination.dateVaccination), // Convertir BigInt en string
                dateBooster: Number(vaccination.dateBooster),     // Convertir BigInt en string
            }));

            return transformedVaccinations;
        } catch (error) {
            console.error('Erreur lors de la récupération des vaccinations d un pet', error);
            throw error;
        }
    }

    async updateVaccination(data) {
        try {
            const vaccination = await prisma.vaccination.update({
                where: { id: data.id },
                data: data,
                include:{
                    vaccine: true
                }
            });

            return vaccination;
        }catch (error){
            console.error('Erreur lors de la modification de la vaccination',error);
            throw error;
        }
    }

    async addVaccination(data) {
        try {
            const vaccination = await prisma.vaccination.create({
                data: data,
                include:{
                    vaccine: true
                }
            });

            return vaccination;
        } catch (error) {
            console.error("Erreur lors de la création de la vaccination", error);
            throw error;
        }
    }

    async deleteVaccinationById(vaccinationId) {
        try {
            const vaccination = await prisma.vaccination.delete({
                where : {
                    id: vaccinationId,
                }
            });

            return vaccination;
        } catch (error) {
            console.error("Erreur lors de la suppression de la vaccination", error);
            throw error;
        }
    }
}

module.exports = new VaccinationRepository();