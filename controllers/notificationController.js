const notificationService = require('../services/notificationService');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET_KEY


exports.getNotificationCount = async (req, res) => {
    try {
        const notificationsCount = await notificationService.getNotificationCount();

        const response = {
            content: notificationsCount,
            success: true,
            message: "Notification count fetch successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();

        const response = {
            content: notifications,
            success: true,
            message: "Notifications fetch successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addNotification = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            name: req.body.name,
            typeNotificationId: req.body.typeId,
            userId: userId,
        }


        const notification = await notificationService.addNotification(data);

        const response = {
            content: notification,
            success: true,
            message: "Notification added successfully"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.deleteNotificationById(Number(req.params.notificationId));

        const response = {
            content: true,
            success: true,
            message: "Notification deleted successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};