const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const checkRole = require("../middlewares/adminMiddleware");
const roleAdmin = Number(process.env.AdminId);

//GET
router.get('/get/all/send', requestController.getAllRequestsSend);
router.get('/get/all/receive', requestController.getAllRequestsReceive);

//UPDATE
router.put('/accept', requestController.accept);
router.put('/acceptNoMore', requestController.acceptNoMore);

//ADD
router.post('/add', requestController.addRequest);

//DELETE
router.delete('/delete/id/:requestId', requestController.deleteRequestById);


module.exports = router;