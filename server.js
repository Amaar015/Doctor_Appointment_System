
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
require('./config/conn');
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/admin', require('./routes/AdminRoute'))
app.use('/api/v1/doctor', require('./routes/doctorRoutes'))
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening from the ${process.env.NODE_MODE} mode on ${process.env.PORT}`.bgCyan.white);
})