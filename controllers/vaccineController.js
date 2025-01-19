const vaccineService = require('../services/vaccineService');
const userService = require("../services/userService");
const vaccinationService = require("../services/vaccinationService");

exports.getAllVaccines = async (req, res) => {
    try {
        const vaccines = await vaccineService.getAllVaccines();

        const response = {
            content: vaccines,
            success: true,
            message: "Liste des vaccins récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getVaccineById = async (req, res) => {
    try {
        const vaccineId = Number(req.params.vaccineId);

        const vaccine = await vaccineService.getVaccineById(vaccineId);

        const response = {
            content: vaccine,
            success: true,
            message: "Vaccins récupéré avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateVaccine = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
            needBooster: req.body.needBooster,
        }

        const vaccine = await vaccineService.updateVaccine(data);

        const response = {
            content: vaccine,
            success: true,
            message: "Vaccin modifié avec succès"
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

exports.addVaccine = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            needBooster: req.body.needBooster,
        }

        const vaccine = await vaccineService.addVaccine(data);

        const response = {
            content: vaccine,
            success: true,
            message: "Vaccin ajouté avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteVaccineById = async (req, res) => {
    try {
        const vaccineId = Number(req.params.vaccineId);

        const vaccine = await vaccineService.deleteVaccineById(vaccineId);

        const response = {
            content: true,
            success: true,
            message: "Vaccin supprimé avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};