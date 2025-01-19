const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BadgeRepository {
    async getAllBadges() {
        try {
            const badges = await prisma.badge.findMany()

            return badges;
        } catch (error) {
            console.error('Erreur lors de la récupération des badges', error);
            throw error;
        }
    }

    async getBadgeLowerX(x) {
        try {
            const badge = await prisma.badge.findFirst({
                where: {
                    numberServices: {
                        lt: x, // numberServices > x
                    },
                },
                orderBy: {
                    numberServices: 'desc', // Tri par ordre croissant
                },
            });

            return badge;
        } catch (error) {
            console.error('Erreur lors de la récupération des badges', error);
            throw error;
        }
    }

    async updateBadge(data) {
        try {
            const badge = await prisma.badge.update({
                where: { id: data.id },
                data: data,
            });

            return badge;
        }catch (error){
            console.error('Erreur lors de la modification du badge',error);
            throw error;
        }
    }

    async addBadge(data) {
        try {
            const badge = await prisma.badge.create({
                data: data,
            });

            return badge;
        } catch (error) {
            console.error("Erreur lors de la création du badge", error);
            throw error;
        }
    }

    async deleteBadgeById(badgeId) {
        try {
            const badge = await prisma.badge.delete({
                where : {
                    id: badgeId,
                }
            });

            return badge;
        } catch (error) {
            console.error("Erreur lors de la suppression du badge", error);
            throw error;
        }
    }
}

module.exports = new BadgeRepository();