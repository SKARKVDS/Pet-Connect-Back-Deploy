const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NotificationRepository {

    async getNotificationCount() {
        try {
            const notificationCount = await prisma.notification.count(
            )

            return notificationCount;
        } catch (error) {
            console.error('Erreur lors de la récupération du compte des notifications', error);
            throw error;
        }
    }

    async getAllNotifications() {
        try {
            const notifications = await prisma.notification.findMany({
                include: {
                    typeNotification: true,
                    user: true
                }
            })

            return notifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications', error);
            throw error;
        }
    }

    async addNotification(data) {
        try {
            const notification = await prisma.notification.create({
                data: data,
            });

            return notification;
        } catch (error) {
            console.error("Erreur lors de la création de la notification", error);
            throw error;
        }
    }

    async deleteNotificationById(notificationId) {
        try {
            const notification = await prisma.notification.delete({
                where : {
                    id: notificationId,
                }
            });

            return notification;
        } catch (error) {
            console.error("Erreur lors de la suppression de la notification", error);
            throw error;
        }
    }
}

module.exports = new NotificationRepository();