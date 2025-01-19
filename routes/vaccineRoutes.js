const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccineController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/get/all', vaccineController.getAllVaccines);
router.get('/get/id/:vaccineId', vaccineController.getVaccineById);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), vaccineController.updateVaccine);

//ADD
router.post('/admin/add', checkRole(roleAdmin), vaccineController.addVaccine);

//DELETE
router.delete('/admin/delete/id/:vaccineId', checkRole(roleAdmin), vaccineController.deleteVaccineById);

module.exports = router;