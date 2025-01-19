const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/get/all/specie/:specieId', raceController.getAllRacesBySpecieId);

//UPDATE
router.put('/admin/update', checkRole(roleAdmin), raceController.updateRace);

//ADD
router.post('/admin/add', checkRole(roleAdmin), raceController.addRace);

//DELETE
router.delete('/admin/delete/id/:raceId', checkRole(roleAdmin), raceController.deleteRaceById);


module.exports = router;