const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const checkRole = require("../middlewares/adminMiddleware");
const upload = uploadMiddleware("folderPet");
const roleAdmin = Number(process.env.AdminId);


router.get('/accessible/:petId', petController.checkPetAccessibleByIdAndToken)

//get
router.get('/get/all/token', petController.getAllPetsByToken);
router.get('/admin/get/all/user/:userId', checkRole(roleAdmin), petController.getAllPetsByUserIdAdmin);

//update
router.put('/update', petController.updatePet);
router.put('/updateImage',upload.single('avatar'), petController.updatePetImage);
router.put('/disable',petController.disablePet);
router.put('/admin/update', checkRole(roleAdmin), petController.updatePetAdmin);
router.put('/admin/resetImage', checkRole(roleAdmin), petController.resetImagePetAdmin);
router.put('/admin/activate', checkRole(roleAdmin), petController.activatePetAdmin);
router.put('/admin/disable', checkRole(roleAdmin),petController.disablePetAdmin);

//add
router.post('/add', upload.single('avatar'), petController.addPet);

//delete
router.delete('/admin/delete/id/:petId', checkRole(roleAdmin), petController.deletePetById);

module.exports = router;