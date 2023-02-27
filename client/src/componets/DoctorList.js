import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    return (
        <div className="card  m-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
        >
            <div className="card-header">
                Dr {doctor.firstName}
            </div>
            <div className="card-body">
                <p>
                    <b>Specialization</b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience</b> {doctor.experience}
                </p>
                <p>
                    <b>Fees Per consultant</b> {doctor.fees}
                </p>
                <p>
                    <b>Email</b> {doctor.email}
                </p>
            </div>
        </div>
    )
}

export default DoctorList