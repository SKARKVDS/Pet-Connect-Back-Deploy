const requestService = require('../services/requestService');
const jwt = require("jsonwebtoken");
const addressService = require("../services/addressService");
const planificationService = require("../services/planificationService");
const jwt_key = process.env.JWT_SECRET_KEY


exports.getAllRequestsSend = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const requests = await requestService.getAllRequestsSendByUserId(userId);

        const response = {
            content: requests,
            success: true,
            message: "Sent requests fetched successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllRequestsReceive = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const requests = await requestService.getAllRequestsReceiveByUserId(userId);

        const response = {
            content: requests,
            success: true,
            message: "Received requests fetched successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.accept = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
        }

        const request = await requestService.acceptRequest(data);

        const response = {
            content: true,
            success: true,
            message: "Request accepted successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.acceptNoMore = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
        }

        const request = await requestService.acceptNoMoreRequest(data);

        const response = {
            content: true,
            success: true,
            message: "Request accepted successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.addRequest = async (req, res) => {
    try {
        const originalDate = new Date(req.body.times.start); // Convertir en objet Date

        const midnightDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate(), 0, 0, 0)

        const midnightTimestamp = midnightDate.getTime();

        const planification = await planificationService.getPlanificationByProposalIdAndTimestamp(Number(req.body.proposalId), midnightTimestamp);

        const data = {
            planificationId : planification.id,
            isAccepted: false,
            pets: req.body.pets.map((pet) => ({ id: Number(pet) })),
            startTime: Number(req.body.times.start),
            endTime: Number(req.body.times.end),
        }

        if ('address' in req.body) {
            data.addressId = await addressService.addOrGetAddress(req.body.address.streetNumber, req.body.address.streetName, req.body.address.city, req.body.address.country);
        } else {
            data.addressId = null
        }

        const request = await requestService.addRequest(data);


        const response = {
            content: true,
            success: true,
            message: "Request added successfully",
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteRequestById = async (req, res) => {
    try {
        const requestId = Number(req.params.requestId);

        const race = await requestService.deleteRequestById(requestId);

        const response = {
            content: true,
            success: true,
            message: "Request deleted successfully.",
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
