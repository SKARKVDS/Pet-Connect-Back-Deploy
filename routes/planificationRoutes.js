const express = require('express');
const router = express.Router();
const planificationController = require('../controllers/planificationController');

router.get('/get/all/:proposalId', planificationController.getAllPlanificationsByProposalId);


router.post('/addPlanifications', planificationController.addPlanifications);



module.exports = router;