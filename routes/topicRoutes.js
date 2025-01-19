const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

router.get('/exist/:topicId', topicController.checkTopicExistById)

// GET
router.get('/get/all/:forumId', topicController.getAllTopicsPostCountsByForumId);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), topicController.updateTopic);

//ADD
router.post('/add', topicController.addTopic);

//DELETE
router.delete('/admin/delete/id/:topicId', checkRole(roleAdmin), topicController.deleteTopicById);

module.exports = router;