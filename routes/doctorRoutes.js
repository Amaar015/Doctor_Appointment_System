const express = require('express');
const { getDoctorController, updateProfileController } = require('../controllers/DoctorCtrl');
const authMiddleware = require('../midlewares/authMidleware');
const router = express.Router()


// // post a Doctor info

router.get('/getDoctorInfo', authMiddleware, getDoctorController)

// update doctor info 
router.get('/updateProfile', authMiddleware, updateProfileController)

module.exports = router;