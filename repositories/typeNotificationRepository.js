const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TypeNotificationRepository {

    async getAllTypesNotifications() {
        try {
            const typesNotifications = await prisma.typeNotification.findMany({
            })

            return typesNotifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des type de notifications', error);
            throw error;
        }
    }

    async updateTypeNotification(data) {
        try {
            const typeNotification = await prisma.typeNotification.update({
                where: {
                    id: data.id,
                },
                data: data,
            });

            return typeNotification;
        } catch (error) {
            console.error("Erreur lors de la modification du type de notification", error);
            throw error;
        }
    }

    async addTypeNotification(data) {
        try {
            const typeNotification = await prisma.typeNotification.create({
                data: data,
            });

            return typeNotification;
        } catch (error) {
            console.error("Erreur lors de la création du type de notification", error);
            throw error;
        }
    }

    async deleteTypeNotificationById(typeNotificationId) {
        try {
            const typeNotification = await prisma.typeNotification.delete({
                where : {
                    id: typeNotificationId,
                }
            });

            return typeNotification;
        } catch (error) {
            console.error("Erreur lors de la suppression du type de notification", error);
            throw error;
        }
    }
}

module.exports = new TypeNotificationRepository();