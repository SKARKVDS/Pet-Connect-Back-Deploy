const sexService = require('../services/sexService');

exports.getAllSexes = async (req, res) => {
    try {
        const sexes = await sexService.getAllSexes();

        const response = {
            content: sexes,
            success: true,
            message: "Liste des sexes récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};