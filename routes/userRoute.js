const express = require('express');
const { LoginController, RegisterController, AuthController, applyDoctorController,
    getAllNotificationController,
    DeleteAllNotificationController }
    = require('../controllers/Userctrl');
const authMidleware = require('../midlewares/authMidleware');



const router = express.Router();

// post Login
router.post('/login', LoginController);

// post register
router.post('/register', RegisterController);

// Home // Auth
router.post('/setUserData', authMidleware, AuthController);


//Apply Doctor // Auth
router.post('/apply-doctor', authMidleware, applyDoctorController);

//Get all notification // Auth
router.post('/get-all-notification', authMidleware, getAllNotificationController);

//Delete all notification // Auth
router.post('/delete-all-notification', authMidleware, DeleteAllNotificationController);

module.exports = router;