const typeService = require('../services/typeService');

exports.getAllTypesAdmin = async (req, res) => {
    try {
        const types = await typeService.getAllTypesAdmin();

        const response = {
            content: types,
            success: true,
            message: "Types admin fetched successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllTypes = async (req, res) => {
    try {
        const types = await typeService.getAllTypes();

        const response = {
            content: types,
            success: true,
            message: "Types fetched successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getTypeById = async (req, res) => {
    try {
        const typeId = Number(req.params.typeId);

        const type = await typeService.getTypeById(typeId);

        const response = {
            content: type,
            success: true,
            message: "Type récupéré avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateType = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            name: req.body.name,
            addressProposal: req.body.addressProposal,
            species: req.body.species,
        }

        const type = await typeService.updateType(data);

        const response = {
            content: type,
            success: true,
            message: "Types updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addType = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            addressProposal: req.body.addressProposal,
            species: req.body.species,
        }

        const type = await typeService.addType(data);

        const response = {
            content: type,
            success: true,
            message: "Types added successfully."
        };


        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteTypeById = async (req, res) => {
    try {
        const typeId = Number(req.params.typeId);

        const type = await typeService.deleteTypeById(typeId);

        const response = {
            content: true,
            success: true,
            message: "Type supprimée avec succès"
        };

        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};