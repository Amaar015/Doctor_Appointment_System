const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

})

const doctorModel = mongoose.model('Doctordb', DoctorSchema);
module.exports = doctorModel;