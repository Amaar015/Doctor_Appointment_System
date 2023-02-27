import React, { useState, useEffect } from 'react'
import Layout from '../componets/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment'
const BookingPage = () => {

    const params = useParams();
    const [doctors, setDoctors] = useState([])
    const [date, setdate] = useState()
    const [isAvailabel, setIsAvailabel] = useState()
   const handleBooking=async()=>{
    
   }


    const getDoctorData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorById',
                { doctorId: params.doctorId }
                , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDoctorData()
    }, [])
    return (
        <Layout>
            <h2>Booking page</h2>
            <div className="container">
                {doctors && (
                    <div className="m-2">
                        <h3>
                            Dr. {doctors.firstName} {doctors.latName}
                        </h3>
                        <h3>
                            Fees: {doctors.fees}
                        </h3>
                        <h3>
                            Email: {doctors.email}
                        </h3>
                        <h3>
                            Specialization : {doctors.specialization}
                        </h3>
                        <div className="flex-d flex-column">
                            <DatePicker format="DD-MM-YYYY" onChange={(value) => moment(value)} />
                            {/* <TimePicker.RangePicker format="HH:mm" /> */}
                            <button className="btn btn-primary mt-2">
                                Check Availability
                            </button>
                            <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage