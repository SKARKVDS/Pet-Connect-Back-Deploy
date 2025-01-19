const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VaccineRepository {
    async getAllVaccines() {
        try {
            const vaccines = await prisma.vaccine.findMany()

            return vaccines;
        } catch (error) {
            console.error('Erreur lors de la récupération des vaccins', error);
            throw error;
        }
    }


    async getVaccineById(vaccineId) {
        try {
            const vaccine = await  prisma.vaccine.findUnique({
                where: {
                    id: vaccineId,
                }
            });

            return vaccine;
        }catch (error){
            console.error('Erreur lors de la récupération du vaccin par son id',error);
            throw error;
        }
    }

    async updateVaccine(data) {
        try {
            const vaccine = await prisma.vaccine.update({
                where: { id: data.id },
                data: data,
            });

            return vaccine;
        }catch (error){
            console.error('Erreur lors de la modification du vaccin',error);
            throw error;
        }
    }

    async addVaccine(data) {
        try {
            const vaccine = await prisma.vaccine.create({
                data: data,
            });

            return vaccine;
        } catch (error) {
            console.error("Erreur lors de la création du vaccin", error);
            throw error;
        }
    }

    async deleteVaccineById(vaccineId) {
        try {
            const vaccine = await prisma.vaccine.delete({
                where : {
                    id: vaccineId,
                }
            });

            return vaccine;
        } catch (error) {
            console.error("Erreur lors de la suppression du vaccin", error);
            throw error;
        }
    }
}

module.exports = new VaccineRepository();