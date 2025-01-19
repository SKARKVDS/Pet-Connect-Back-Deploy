const planificationService = require('../services/planificationService');




exports.getAllPlanificationsByProposalId = async (req, res) => {
    try {
        const proposalId = Number(req.params.proposalId)

        const planifications = await planificationService.getAllPlanificationsByProposalId(proposalId);

        const response = {
            content: planifications,
            success: true,
            message: "Liste des planifications récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.addPlanifications = async (req, res) => {
    try {
        const data = {
            dateTimes: req.body.dateTimes,
            proposalId : Number(req.body.proposalId)
        }

        await planificationService.addPlanifications(data);

        const response = {
            content: true,
            success: true,
            message: "Planification créée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};