const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class SexRepository {
    async getAllSexes() {
        try {
            const sexes = await prisma.sex.findMany()

            return sexes;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }
}

module.exports = new SexRepository();