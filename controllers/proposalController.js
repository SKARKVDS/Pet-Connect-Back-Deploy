const proposalService = require('../services/proposalService');
const addressService = require('../services/addressService');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET_KEY


exports.checkProposalAccessibleByIdAndToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const exist = await proposalService.checkProposalAccessibleByIdAndUserId(Number(req.params.proposalId), userId);

        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Proposal accessible"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Proposal not accessible"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.getAllProposalsByUserIdAdmin = async (req, res) => {
    try {
        const proposals = await proposalService.getAllProposalsByUserIdAdmin(Number(req.params.userId));

        const response = {
            content: proposals,
            success: true,
            message: "Propositions admin fetched by id successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllProposalsByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const proposals = await proposalService.getAllProposalsByUserId(userId);

        const response = {
            content: proposals,
            success: true,
            message: "Propositions fetched by token successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllProposalsByTimestamp = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const proposals = await proposalService.getAllProposalsByTimestamp(Number(req.params.timestamp), userId);

        const response = {
            content: proposals,
            success: true,
            message: "Propositions fetched by timestamp successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.updateProposalAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            description: req.body.description,
        };

        const proposal = await proposalService.updateProposalAdmin(data);


        const response = {
            content: proposal,
            success: true,
            message: "Proposition updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.activeProposalAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            isDisable: false
        };

        const proposal = await proposalService.updateProposalAdmin(data);

        const response = {
            content: proposal,
            success: true,
            message: "Proposition updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.disableProposalAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            isDisable: true
        };

        const proposal = await proposalService.updateProposalAdmin(data);

        const response = {
            content: proposal,
            success: true,
            message: "Proposition updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.disableProposal = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            isDisable: true
        };

        //todo
        const proposal = await proposalService.updateProposal(data);



        const response = {
            content: proposal,
            success: true,
            message: "Proposition updated successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addProposal = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            description: req.body.description,
            userId: userId,
            typeId : Number(req.body.typeId),
            species: req.body.species,
        };

        if ('address' in req.body) {
            data.addressId = await addressService.addOrGetAddress(req.body.address.streetNumber, req.body.address.streetName, req.body.address.city, req.body.address.country);
        } else {
            data.addressId = null
        }


        const proposal = await proposalService.addProposal(data);

        const response = {
            content: proposal,
            success: true,
            message: "Proposition ajoutée avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteProposalById = async (req, res) => {
    try {
        const proposalId = Number(req.params.proposalId);

        const proposal = await proposalService.deleteProposalById(proposalId);

        const response = {
            content: true,
            success: true,
            message: "Proposal deleted successfully."
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

