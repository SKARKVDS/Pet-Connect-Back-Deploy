const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

router.get('/exist/:forumId', forumController.checkForumExistById)

// GET
router.get('/get/all', forumController.getAllForums);
router.get('/get/topicId/:topicId', forumController.getByTopicId)
//UPDATE
router.put('/admin/update', checkRole(roleAdmin), forumController.updateForum);

//ADD
router.post('/admin/add', checkRole(roleAdmin), forumController.addForum);

//DELETE
router.delete('/admin/delete/id/:forumId', checkRole(roleAdmin), forumController.deleteForumById);
module.exports = router;