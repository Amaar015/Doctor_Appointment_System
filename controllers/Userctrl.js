
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/docModels');
// Register user
const RegisterController = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ email: req.body.email });
        if (existUser) {
            res.status(201).send({ message: "User Already exist", success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registered Successfully", success: true });
    } catch (err) {
        console.log(err);
        res.status(401).send({ success: false, message: `Register Controller ${err.message}` })
    }
}
// register the login
const LoginController = async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: `Invalid Email or Password! please try again`, success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: "Login succesfully", success: true, token });


    } catch (err) {
        console.log(err)
        res.status(201).send({ success: false, message: `Login failed ${err.message}` });
    }
}

// 
const AuthController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(401).send({
                message: "User not found",
                success: false,
            })
        } else {

            res.status(201).send({
                success: true,
                data: user,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Auth failed",
            success: false,
        })
    }
}

// Apply doctor
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'Pending' })
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied for a Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastname,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({
            success: true,
            message: 'Doctor account Applied successfuly',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error Applying for Doctor"
        })
    }
}


// notification controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seenNotification = user.SeenNotification;
        const notification = user.notification;
        seenNotification.push(...notification)
        user.notification = []
        const updateUser = await user.save();
        res.status(201).send({
            success: true,
            message: 'all notification marked as read',
            data: updateUser,
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in Notification",
            error,
        })
    }
}
// delte all seen notification
const DeleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = [];
        user.SeenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notification deleted successfuly",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Something went wrong',
            error,

        })
    }
}

// get doctors controller
const getAllDoctorsController = async (req, res) => {
    try {
        const doctor = await doctorModel.find({ status: 'approved' })
        res.status(201).send({
            success: true,
            message: "Doctors list fetched successfuly",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success: false,
            message: "Error while Fetching Doctor",
            error,
        })
    }
}
module.exports = {
    LoginController, RegisterController, AuthController,
    applyDoctorController, getAllNotificationController,
    DeleteAllNotificationController, getAllDoctorsController
}