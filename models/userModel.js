const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        dafault: []
    },
    SeenNotification: {
        type: Array,
        dafault: [],
    }

})

const userModel = mongoose.model('userdb', UserSchema);
module.exports = userModel;