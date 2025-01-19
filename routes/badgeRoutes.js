const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const checkRole = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const roleAdmin = Number(process.env.AdminId);
const upload = uploadMiddleware("folderBadge");

// GET
router.get('/admin/get/all', checkRole(roleAdmin), badgeController.getAllBadges);

//UPDATE
router.put('/admin/update/attributes', checkRole(roleAdmin), badgeController.updateBadgeAttributes);
router.put('/admin/update/image', checkRole(roleAdmin), upload.single('avatar'), badgeController.updateBadgeImage);

//ADD
router.post('/admin/add', checkRole(roleAdmin), upload.single('avatar'), badgeController.addBadge);

//DELETE
router.delete('/admin/delete/id/:badgeId', checkRole(roleAdmin), badgeController.deleteBadgeById);
module.exports = router;