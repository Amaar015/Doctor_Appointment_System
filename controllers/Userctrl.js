
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
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
            res.status(200).send({ message: 'User not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(200).send({ message: `Invalid Email or Password! please try again`, success: false })
        }
        const token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: "Login succesfully", success: true, token });


    } catch (err) {
        console.log(err)
        res.status(201).send({ success: false, message: `Login failed ${err.message}` });
    }
}





module.exports = { LoginController, RegisterController }