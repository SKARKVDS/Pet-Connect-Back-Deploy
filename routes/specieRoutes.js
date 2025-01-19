const express = require('express');
const router = express.Router();
const specieController = require('../controllers/specieController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//check
router.get('/admin/exist/:specieId',checkRole(roleAdmin), specieController.checkSpecieExistById)

//GET
router.get('/get/all', specieController.getAllSpecies);
router.get('/admin/get/all', checkRole(roleAdmin), specieController.getAllSpeciesWithRaceCounts);
router.get('/get/all/type/:typeId', specieController.getAllSpeciesByTypeId);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), specieController.updateSpecie);

//ADD
router.post('/admin/add', checkRole(roleAdmin), specieController.addSpecie);

//DELETE
router.delete('/admin/delete/id/:specieId', checkRole(roleAdmin), specieController.deleteSpecieById);

module.exports = router;