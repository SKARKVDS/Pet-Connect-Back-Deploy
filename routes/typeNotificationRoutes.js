const express = require('express');
const router = express.Router();
const typeNotificationController = require('../controllers/typeNotificationController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/get/all', typeNotificationController.getAllTypesNotifications);

//ADD
router.post('/admin/update', checkRole(roleAdmin), typeNotificationController.updateTypeNotification);

//ADD
router.post('/admin/add', checkRole(roleAdmin), typeNotificationController.addTypeNotification);

//DELETE
router.delete('/admin/delete/id/:typeNotificationId', checkRole(roleAdmin), typeNotificationController.deleteTypeNotificationById);


module.exports = router;