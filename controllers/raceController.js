const raceService = require('../services/raceService');

exports.getAllRacesBySpecieId = async (req, res) => {
    try {
        const specieId = Number(req.params.specieId);

        const races = await raceService.getAllRacesBySpecieId(specieId);

        const response = {
            content: races,
            success: true,
            message: "Races récupérées avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateRace = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            name: req.body.name,
            specieId: Number(req.body.specieId),
        }

        const race = await raceService.updateRace(data);

        const response = {
            content: race,
            success: true,
            message: "Race modifiée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        if(error.code === 'P2025'){
            res.status(400).json({ message: 'Race inexistante', success: false });
        }else if(error.code === 'P2002'){
            res.status(409).json({ message: 'Race déjà existante', success: false });
        }else{
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
};

exports.addRace = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            specieId: Number(req.body.specieId),
        }

        const race = await raceService.addRace(data);

        const response = {
            content: race,
            success: true,
            message: "Race ajoutée avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        if(error.code === 'P2002'){
            res.status(409).json({ message: 'Race déjà existante', success: false });
        }else{
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
};

exports.deleteRaceById = async (req, res) => {
    try {
        const raceId = Number(req.params.raceId);

        const race = await raceService.deleteRaceById(raceId);

        const response = {
            content: true,
            success: true,
            message: "Race supprimée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        if(error.code === 'P2025'){
            res.status(400).json({ message: 'Espèce inexistante', success: false });
        }else{
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
};