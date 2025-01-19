const vaccinationService = require('../services/vaccinationService');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET_KEY

exports.getAllFutureVaccinationsByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const vaccinations = await vaccinationService.getAllFutureVaccinationsByUserId(userId);

        const response = {
            content: vaccinations,
            success: true,
            message: "Future vaccinations fetched by token successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllVaccinationsByPetId = async (req, res) => {
    try {
        const petId = Number(req.params.petId);

        const vaccinations = await vaccinationService.getAllVaccinationsByPetId(petId);

        const response = {
            content: vaccinations,
            success: true,
            message: "Vaccinations fetch successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.updateVaccination = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            vaccineId: Number(req.body.vaccineId),
            dateVaccination: req.body.dateVaccination,
            dateBooster: req.body.dateBooster,
        }

        const vaccination = await vaccinationService.updateVaccination(data);

        const response = {
            content: vaccination,
            success: true,
            message: "Vaccination updated successfully"
        };

        res.status(200).json(response);
    } catch (error) {

        res.status(500).json({ message: 'Erreur serveur', error });

    }
};

exports.addVaccination = async (req, res) => {
    try {
        const data = {
            vaccineId: Number(req.body.vaccineId),
            petId: Number(req.body.petId),
            dateVaccination: req.body.dateVaccination,
            dateBooster: req.body.dateBooster,
        }

        const vaccination = await vaccinationService.addVaccination(data);

        const response = {
            content: vaccination,
            success: true,
            message: "Vaccination added successfully"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteVaccinationById = async (req, res) => {
    try {
        const vaccinationId = Number(req.params.vaccinationId);

        const vaccination = await vaccinationService.deleteVaccinationById(vaccinationId);

        const response = {
            content: true,
            success: true,
            message: "Vaccination deleted successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};