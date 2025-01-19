const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/admin/get/all', checkRole(roleAdmin), typeController.getAllTypesAdmin);
router.get('/get/all', typeController.getAllTypes);
router.get('/get/id/:typeId', typeController.getTypeById);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), typeController.updateType);

//ADD
router.post('/admin/add', checkRole(roleAdmin), typeController.addType);

//DELETE
router.delete('/admin/delete/id/:typeId', checkRole(roleAdmin), typeController.deleteTypeById);

module.exports = router;