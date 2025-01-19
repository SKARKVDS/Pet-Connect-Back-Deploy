const typeNotificationService = require('../services/typeNotificationService');

exports.getAllTypesNotifications = async (req, res) => {
    try {
        const typesNotifications = await typeNotificationService.getAllTypesNotifications();

        const response = {
            content: typesNotifications,
            success: true,
            message: "Types notifications fetch successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateTypeNotification = async (req, res) => {
    try {

        const data = {
            id: req.body.id,
            name: req.body.name,
        }


        const typeNotification = await typeNotificationService.updateTypeNotification(data);

        const response = {
            content: typeNotification,
            success: true,
            message: "Type notification updated successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addTypeNotification = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
        }

        const typeNotification = await typeNotificationService.addTypeNotification(data);

        const response = {
            content: typeNotification,
            success: true,
            message: "Type notification added successfully"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteTypeNotificationById = async (req, res) => {
    try {
        const typeNotification = await typeNotificationService.deleteTypeNotificationById(Number(req.params.typeNotificationId));

        const response = {
            content: true,
            success: true,
            message: "Type notification deleted successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};