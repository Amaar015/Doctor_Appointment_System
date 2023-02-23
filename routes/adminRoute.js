const express = require('express');
const { getAllDoctorController, getAllUserController,
    changeAccountStatusController } = require('../controllers/Adminctrl');
const authMidleware = require('../midlewares/authMidleware');

const router = express.Router()

// Get Methods Users
router.get('/getAllUser', authMidleware, getAllUserController);

// get Methods All Doctors

router.get('/getAllDocter', authMidleware, getAllDoctorController);

// post methode set the status

router.post('/changeAccounStatus', authMidleware, changeAccountStatusController)

module.exports = router;