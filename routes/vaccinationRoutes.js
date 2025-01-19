const express = require('express');
const router = express.Router();
const vaccinationController = require('../controllers/vaccinationController');

//GET
router.get('/get/allFuture/token', vaccinationController.getAllFutureVaccinationsByToken);
router.get('/get/all/pet/:petId', vaccinationController.getAllVaccinationsByPetId);

//UPDATE
router.put('/update', vaccinationController.updateVaccination);

//ADD
router.post('/add', vaccinationController.addVaccination);

//DELETE
router.delete('/delete/id/:vaccinationId', vaccinationController.deleteVaccinationById);

module.exports = router;