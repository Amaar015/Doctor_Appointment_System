const express = require('express');
const { LoginController, RegisterController } = require('../controllers/Userctrl');



const router = express.Router();

// post Login
router.post('/login', LoginController);

// post register
router.post('/register', RegisterController);

module.exports = router;