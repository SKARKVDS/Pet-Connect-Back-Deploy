const petService = require('../services/petService');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET_KEY
const defaultImagePet = "https://res.cloudinary.com/djz8pmzjo/image/upload/v1736624483/itauibiiten7nswet0we.jpg"


exports.checkPetAccessibleByIdAndToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const exist = await petService.checkPetAccessibleByIdAndUserId(Number(req.params.petId), userId);

        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Pet accessible"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Pet not accessible"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllPetsByToken = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const pets = await petService.getAllPetsByUserId(userId);

        const response = {
            content: pets,
            success: true,
            message: "Pets fetch by user successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllPetsByUserIdAdmin = async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        const pets = await petService.getAllPetsByUserIdAdmin(userId);

        const response = {
            content: pets,
            success: true,
            message: "Pets fetch by user successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            nickName: req.body.nickName,
            birthDate: Number(req.body.birthDate),
            identification: req.body.identification,
            raceId: Number(req.body.raceId),
            sexId: Number(req.body.sexId),
        };

        const pet = await petService.updatePet(data);


        const response = {
            content: pet,
            success: true,
            message: "Pet updated successfully"
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updatePetImage = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            url: req.file.path
        };

        const pet = await petService.updatePet(data);

        const response = {
            content: pet,
            success: true,
            message: "Pet updated successfully"
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updatePetAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            nickName: req.body.nickName,
            birthDate: req.body.birthDate,
            identification: req.body.identification,
            raceId: Number(req.body.raceId),
            sexId: Number(req.body.sexId),
        };

        const pet = await petService.updatePetAdmin(data);

        const response = {
            content: pet,
            success: true,
            message: "Pet updated successfully"
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.resetImagePetAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            url: defaultImagePet,
        };

        const pet = await petService.updatePetAdmin(data);

        const response = {
            content: pet,
            success: true,
            message: "Pet image reset successfully",
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.activatePetAdmin = async (req, res) => {
    try {

        const data = {
            id: Number(req.body.id),
            isDisable: false,
        };

        const pet = await petService.updatePetAdmin(data);


        const response = {
            content: pet,
            success: true,
            message: "Pet activated successfully",
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.disablePetAdmin = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            isDisable: true,
        };

        const pet = await petService.updatePetAdmin(data);


        const response = {
            content: pet,
            success: true,
            message: "Pet disabled successfully",
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.disablePet = async (req, res) => {
    try {
        const data = {
            id: Number(req.body.id),
            isDisable: true,
        };

        const pet = await petService.updatePet(data);


        const response = {
            content: true,
            success: true,
            message: "Pet disabled successfully",
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.addPet = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;


        const data = {
            nickName: req.body.nickName,
            birthDate: Number(req.body.birthDate),
            identification: req.body.identification,
            raceId: Number(req.body.raceId),
            userId: userId,
            sexId: Number(req.body.sexId),
            url: req.file.path
        };

        const pet = await petService.addPet(data);

        const response = {
            content: pet,
            success: true,
            message: "Pet added successfully"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.deletePetById = async (req, res) => {
    try {
        const petId = Number(req.params.petId);

        await petService.deletePetById(petId);

        const response = {
            content: true,
            success: true,
            message: "Pet deleted successfully"
        };
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
