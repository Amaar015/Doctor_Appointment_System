const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone no is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    portfolio: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "adress is required"],
    },
    specialization: {
        type: String,
        required: [true, "specialization is required"],
    },
    experience: {
        type: String,
        required: [true, "Experience is required"]
    },
    fees: {
        type: Number,
        required: [true, "fess description is required"]

    },
    status: {
        type: String,
        default: "Pending"
    }
    ,
    timeings: {
        type: Object,
        required: [true, "Working time is required"]
    },
}, { timestamps: true })

const doctorModel = mongoose.model('Doctordb', DoctorSchema);
module.exports = doctorModel;