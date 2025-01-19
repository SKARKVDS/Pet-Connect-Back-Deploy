const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

router.get('/accessible/:proposalId', proposalController.checkProposalAccessibleByIdAndToken)

//get
router.get('/admin/get/all/user/:userId', checkRole(roleAdmin), proposalController.getAllProposalsByUserIdAdmin);
router.get('/get/all/token', proposalController.getAllProposalsByToken);

router.get('/get/all/timestamp/:timestamp', proposalController.getAllProposalsByTimestamp);

//update
router.put('/admin/update', checkRole(roleAdmin), proposalController.updateProposalAdmin);
router.put('/admin/activate', checkRole(roleAdmin), proposalController.activeProposalAdmin);
router.put('/admin/disable', checkRole(roleAdmin), proposalController.disableProposalAdmin);
router.put('/disable', proposalController.disableProposal);

//add
router.post('/add', proposalController.addProposal);

//delete
router.delete('/admin/delete/id/:proposalId', checkRole(roleAdmin), proposalController.deleteProposalById);

module.exports = router;