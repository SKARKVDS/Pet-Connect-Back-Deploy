const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const upload = uploadMiddleware("folderPhoto");

// Getter
router.get('/get/all/reservation/:reservationId', photoController.getAllPhotosByReservationId);

// CRUD
router.post('/add', upload.single('avatar'),photoController.addPhoto);

router.delete('/delete/id/:photoId',photoController.deletePhotoById);

module.exports = router;