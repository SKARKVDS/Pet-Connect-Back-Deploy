const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/request/accessible/:reservationId', reservationController.checkReservationRequestAccessibleByIdAndToken)
router.get('/proposal/accessible/:reservationId', reservationController.checkReservationProposalAccessibleByIdAndToken)
router.get('/memory/accessible/:reservationId', reservationController.checkMemoryAccessibleByIdAndToken)

//GET
router.get('/get/allProposal/token', reservationController.getAllReservationsProposalByToken);
router.get('/get/allRequest/token', reservationController.getAllReservationsRequestByToken);

router.get('/get/allMemoryProposal/token', reservationController.getAllReservationsMemoryProposalByToken);
router.get('/get/allMemoryRequest/token', reservationController.getAllReservationsMemoryRequestByToken);

router.get('/get/request/id/:id', reservationController.getReservationRequestById);
router.get('/get/proposal/id/:id', reservationController.getReservationProposalById);

router.put('/finish', reservationController.finishReservation);

module.exports = router;