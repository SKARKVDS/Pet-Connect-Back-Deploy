const postService = require('../services/postService');
const jwt = require('jsonwebtoken');
const topicService = require("../services/topicService");
const jwt_key = process.env.JWT_SECRET_KEY


exports.getAllPostsByTopicId = async (req, res) => {
    try {
        const topicId = Number(req.params.topicId);

        const posts = await postService.getAllPostsByTopicId(topicId);

        const response = {
            content: posts,
            success: true,
            message: "Liste des posts d'un topic récupérée avec succès"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            body: req.body.body,
        };

        const post = await postService.updatePost(data);

        const response = {
            content: post,
            success: true,
            message: "Post modifié avec succès"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addPost = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            body: req.body.body,
            creationTime: Date.now(),
            userId: userId,
            topicId: Number(req.body.topicId),
        };

        const post = await postService.addPost(data);

        const response = {
            content: post,
            success: true,
            message: "Post ajouté avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deletePostById = async (req, res) => {
    try {
        const postId = Number(req.params.postId)

        const post = await postService.deletePostById(postId);

        const response = {
            content: true,
            success: true,
            message: "Post supprimé avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};