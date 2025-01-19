const specieService = require('../services/specieService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET_KEY


exports.checkSpecieExistById = async (req, res) => {
    try {
        const exist = await specieService.checkSpecieExistById(Number(req.params.specieId));
        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Specie exists"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Specie doesn't exist"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllSpecies = async (req, res) => {
    try {
        const species = await specieService.getAllSpecies();

        const response = {
            content: species,
            success: true,
            message: "Liste des espèces récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllSpeciesWithRaceCounts = async (req, res) => {
    try {
        const species = await specieService.getAllSpeciesWithRaceCounts();

        const response = {
            content: species,
            success: true,
            message: "Liste des espèces avec compte race récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllSpeciesByTypeId = async (req, res) => {
    try {
        const typeId = Number(req.params.typeId);

        const species = await specieService.getAllSpeciesByTypeId(typeId);

        const response = {
            content: species,
            success: true,
            message: "Liste des espèces par type récupérée avec succès"
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateSpecie = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
        }

        const specie = await specieService.updateSpecie(data);

        const response = {
            content: specie,
            success: true,
            message: "Espèce modifiée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        if(error.code === 'P2025'){
            res.status(400).json({ message: 'Espèce inexistante', success: false });
        }else if(error.code === 'P2002'){
            res.status(409).json({ message: 'Espèce déjà existante', success: false });
        }else{
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
};

exports.addSpecie = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
        }

        const specie = await specieService.addSpecie(data);

        const response = {
            content: specie,
            success: true,
            message: "Espèce ajoutée avec succès"
        };

        res.status(201).json(response);

    } catch (error) {
        if(error.code === 'P2002'){
            res.status(409).json({ message: 'Espèce déjà existante', success: false });
        }else{
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
};

exports.deleteSpecieById = async (req, res) => {
    try {
        const specieId = Number(req.params.specieId);

        const specie = await specieService.deleteSpecieById(specieId);

        const response = {
            content: true,
            success: true,
            message: "Espèce supprimée avec succès"
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