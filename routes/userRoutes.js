const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const checkRole = require("../middlewares/adminMiddleware");

const uploadMiddleware = require("../middlewares/uploadMiddleware");
const upload = uploadMiddleware("folderUser");
const roleAdmin = Number(process.env.AdminId);

router.get('/admin/exist/:userId',checkRole(roleAdmin), userController.checkUserExistById)

// CRUD
router.get('/admin/get/all', checkRole(roleAdmin),userController.getAllUsers);

router.get('/account', userController.getUserByToken);

router.get('/checkToken', userController.checkToken);
router.get('/checkTokenAdmin', userController.checkTokenAdmin);

router.post('/login', userController.login);

router.put('/update', userController.updateUser);

router.put("/update/image", upload.single('avatar'), userController.updateUserImage);
router.put("/update/userName", userController.updateUserName);
router.put("/update/firstName", userController.updateUserFirstName);
router.put("/update/lastName", userController.updateUserLastName);
router.put("/update/email", userController.updateUserEmail);
router.put("/update/phoneNumber", userController.updateUserPhoneNumber);
router.put("/update/password", userController.updateUserPassword);


router.put('/admin/update', checkRole(roleAdmin), userController.updateUserAdmin);
router.put('/admin/deleteImage/id', checkRole(roleAdmin), userController.deleteUserImageAdmin);


router.post('/add', upload.single('avatar'), userController.addUser);


module.exports = router;