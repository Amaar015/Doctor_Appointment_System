const express = require('express');
const { getDoctorInfoController, updateProfileController } = require('../controllers/DoctorCtrl');
const authMiddleware = require('../midlewares/authMidleware');
const router = express.Router()


// // post a Doctor info

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// update doctor info 
router.post('/updateProfile', authMiddleware, updateProfileController)

module.exports = router;