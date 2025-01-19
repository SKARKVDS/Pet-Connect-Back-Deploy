const forumService = require('../services/forumService');

exports.checkForumExistById = async (req, res) => {
    try {
        const exist = await forumService.checkForumExistById(Number(req.params.forumId));
        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "Forum exists"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "Forum doesn't exist"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllForums = async (req, res) => {
    try {
        const forums = await forumService.getAllForums();

        const response = {
            content: forums,
            success: true,
            message: "Liste des forums récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getByTopicId = async (req, res) => {
    try {
        const topicId = Number(req.params.topicId);

        const forum = await forumService.getByTopicId(topicId);

        const response = {
            content: forum,
            success: true,
            message: "Forum fetched by topic id successfully"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateForum= async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
        }

        const forum = await forumService.updateForum(data);

        const response = {
            content: forum,
            success: true,
            message: "Espèce modifiée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addForum = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
        }

        const forum = await forumService.addForum(data);

        const response = {
            content: forum,
            success: true,
            message: "Espèce ajoutée avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteForumById = async (req, res) => {
    try {
        const forumId = Number(req.params.forumId);

        const forum = await forumService.deleteForumById(forumId);

        const response = {
            content: true,
            success: true,
            message: "Forum supprimée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
