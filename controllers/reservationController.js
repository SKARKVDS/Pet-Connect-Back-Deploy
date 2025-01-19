const services = require('../services/reservationService');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET_KEY

exports.checkReservationRequestAccessibleByIdAndToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const exist = await services.checkReservationRequestAccessibleByIdAndUserId(Number(req.params.reservationId), userId);

        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Reservation requested accessible"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Reservation requested not accessible"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.checkReservationProposalAccessibleByIdAndToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const exist = await services.checkReservationProposalAccessibleByIdAndUserId(Number(req.params.reservationId), userId);

        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Reservation proposal accessible"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Reservation proposal not accessible"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.checkMemoryAccessibleByIdAndToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const existProposal = await services.checkReservationProposalAccessibleByIdAndUserId(Number(req.params.reservationId), userId);
        const existRequest = await services.checkReservationRequestAccessibleByIdAndUserId(Number(req.params.reservationId), userId);

        if(existProposal || existRequest){
            const response = {
                content: true,
                success: true,
                message: "Memory accessible"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: false,
                success: false,
                message: "Memory not accessible"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllReservationsProposalByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const reservations = await services.getAllReservationsProposalByUserId(userId);

        const response = {
            content: reservations,
            success: true,
            message: "Proposal reservations fetched successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllReservationsRequestByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const reservations = await services.getAllReservationsRequestByUserId(userId);

        const response = {
            content: reservations,
            success: true,
            message: "Requested reservations fetched successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllReservationsMemoryRequestByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const reservations = await services.getAllReservationsMemoryRequestByUserId(userId);

        const response = {
            content: reservations,
            success: true,
            message: "Requested reservations fetched successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllReservationsMemoryProposalByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const reservations = await services.getAllReservationsMemoryProposalByUserId(userId);

        const response = {
            content: reservations,
            success: true,
            message: "Requested reservations fetched successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getReservationRequestById = async (req, res) => {
    try {

        const reservation = await services.getReservationRequestById(Number(req.params.id));

        const response = {
            content: reservation,
            success: true,
            message: "Requested reservation fetched by id successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getReservationProposalById = async (req, res) => {
    try {

        const reservation = await services.getReservationProposalById(Number(req.params.id));

        const response = {
            content: reservation,
            success: true,
            message: "Proposal reservation fetched by id successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.finishReservation = async (req, res) => {
    try {
        const data ={
            id: Number(req.body.id),
            isFinish: true
        }

        const reservation = await services.finishReservation(data);

        const response = {
            content: reservation,
            success: true,
            message: "Reservation updated successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};