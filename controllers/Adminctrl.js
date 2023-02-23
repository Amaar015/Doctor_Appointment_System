const doctorModle = require('../models/docModels');
const userModle = require('../models/userModel')


const getAllUserController = async (req, res) => {
    try {
        const users = await userModle.find({})
        res.status(200).send({
            success: true,
            message: "user data",
            data: users,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while fetching the user",
            error,
        })
    }
}

const getAllDoctorController = async (req, res) => {
    try {
        const doctors = await doctorModle.find({})
        res.status(200).send({
            success: true,
            message: "Doctor data",
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while fatching the Doctor",
            error,
        })
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModle.findByIdAndUpdate(doctorId, { status })
        const user = await userModle.findOne({ _id: doctor.userId })
        const notification = user.notification
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Doctor Account Request has ${status}`,
            onClickPath: "/notification"
        })
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: 'Account status Updated',
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "error in account status",
            error
        })
    }
}

module.exports = {
    getAllDoctorController,
    getAllUserController,
    changeAccountStatusController
}