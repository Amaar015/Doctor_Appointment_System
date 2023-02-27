const doctorModle = require('../models/docModels')
const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModle.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "Data fatched successfuly",
            data: doctor,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in fetching doctor data",
            error,
        });
    }

}

// update doc profile

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModle.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        )
        res.status(201).send({
            success: true,
            message: "Doctor Profile updated",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Doctor Profile update issue",
            error,
        })
    }
}
// get all doctor by id

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModle.findOne({ _id: req.body.doctorId })
        res.status(201).send({
            success: true,
            messsage: "Single doctor fatched successfuly",
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in geting single doctor info",
            error,
        })
    }
}


module.exports = {
    getDoctorInfoController, updateProfileController,
    getDoctorByIdController
}