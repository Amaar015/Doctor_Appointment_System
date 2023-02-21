const express = require('express');
const { getAllDoctorController, getAllUserController } = require('../controllers/Adminctrl');
const authMidleware = require('../midlewares/authMidleware');

const router = express.Router()

// Get Methods Users
router.get('/getAllUser', authMidleware, getAllUserController);

// get Methods All Doctors

router.get('/getAllDocter', authMidleware, getAllDoctorController);


module.exports = router;