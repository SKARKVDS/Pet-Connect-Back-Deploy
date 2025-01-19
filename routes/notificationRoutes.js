const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/admin/get/count', checkRole(roleAdmin), notificationController.getNotificationCount);
router.get('/admin/get/all', checkRole(roleAdmin), notificationController.getAllNotifications);

//ADD
router.post('/add', notificationController.addNotification);

//DELETE
router.delete('/admin/delete/id/:notificationId', checkRole(roleAdmin), notificationController.deleteNotificationById);


module.exports = router;