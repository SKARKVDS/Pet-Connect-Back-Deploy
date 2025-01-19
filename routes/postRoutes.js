const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

// GET
router.get('/get/all/topic/:topicId', postController.getAllPostsByTopicId);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), postController.updatePost);

//ADD
router.post('/add', postController.addPost);

//DELETE
router.delete('/admin/delete/id/:postId', checkRole(roleAdmin), postController.deletePostById)

module.exports = router;