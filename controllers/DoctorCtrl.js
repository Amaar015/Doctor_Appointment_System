const doctorModle = require('../models/docModels')
const getDoctorController = async (req, res) => {
    try {
        const doctor = await doctorModle.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "Data fatched successfuly",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in fetching doctor data",
            error
        })
    }

}

// update doc profile

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModle.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        )
        res.status(200).send({
            success: true,
            message: "Doctor Profile updated",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Doctor Profile update issue",
            error
        })
    }
}
module.exports = { getDoctorController, updateProfileController }