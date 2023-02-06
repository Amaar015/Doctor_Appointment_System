const express = require('express');
const { LoginController, RegisterController, AuthController } = require('../controllers/Userctrl');
const authMidleware = require('../midlewares/authMidleware');



const router = express.Router();

// post Login
router.post('/login', LoginController);

// post register
router.post('/register', RegisterController);

// Home // Auth
router.post('/setUserData', authMidleware, AuthController);

module.exports = router;