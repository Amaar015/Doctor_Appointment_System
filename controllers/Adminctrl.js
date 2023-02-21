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


module.exports = {
    getAllDoctorController,
    getAllUserController
}