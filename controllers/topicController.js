const topicService = require('../services/topicService');
const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET_KEY

exports.checkTopicExistById = async (req, res) => {
    try {
        const exist = await topicService.checkTopicExistById(Number(req.params.topicId));
        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Topic exists"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Topic doesn't exist"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllTopicsPostCountsByForumId = async (req, res) => {
    try {
        const forumId = Number(req.params.forumId);

        const topics = await topicService.getAllTopicsWithPostCountsByForumId(forumId);

        const response = {
            content: topics,
            success: true,
            message: "Liste des topics d'un forum avec compte post récupérée avec succès"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateTopic = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
        };

        const topic = await topicService.updateTopic(data);

        const response = {
            content: topic,
            success: true,
            message: "Topic modifié avec succès"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addTopic = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            name: req.body.name,
            forumId: Number(req.body.forumId),
            userId: userId,
            creationTime: Date.now(),
            updateTime: Date.now(),
        };

        const topic = await topicService.addTopic(data);

        const response = {
            content: topic,
            success: true,
            message: "Topic ajouté avec succès"
        };


        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteTopicById = async (req, res) => {
    try {
        const topicId = Number(req.params.topicId)

        const topic = await topicService.deleteTopicById(topicId);

        const response = {
            content: true,
            success: true,
            message: "Topic supprimé avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
