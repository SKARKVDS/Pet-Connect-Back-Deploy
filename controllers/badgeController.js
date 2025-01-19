const badgeService = require('../services/badgeService');


exports.getAllBadges = async (req, res) => {
    try {
        const badges = await badgeService.getAllBadges();

        const response = {
            content: badges,
            success: true,
            message: "Badges fetched successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateBadgeAttributes = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            name: req.body.name,
            numberServices: Number(req.body.numberServices),
        }

        const badge = await badgeService.updateBadge(data);

        const response = {
            content: badge,
            success: true,
            message: "Badge attributes updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateBadgeImage = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            url: req.file.path
        }

        const badge = await badgeService.updateBadge(data);

        const response = {
            content: badge,
            success: true,
            message: "Badge image updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addBadge = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            numberServices: Number(req.body.numberServices),
            url: req.file.path
        }

        const badge = await badgeService.addBadge(data);

        const response = {
            content: badge,
            success: true,
            message: "Badge added successfully."
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteBadgeById = async (req, res) => {
    try {
        const badgeId = Number(req.params.badgeId);

        const badge = await badgeService.deleteBadgeById(badgeId);

        const response = {
            content: true,
            success: true,
            message: "Badge deleted successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
