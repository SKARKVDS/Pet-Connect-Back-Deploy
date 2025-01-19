const express = require('express');
const router = express.Router();
const sexController = require('../controllers/sexController');

//GET
router.get('/get/all', sexController.getAllSexes);

module.exports = router;