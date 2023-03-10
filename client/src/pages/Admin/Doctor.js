
import React, { useEffect, useState } from 'react'
import Layout from '../../componets/Layout'
import axios from 'axios'
import { genComponentStyleHook } from 'antd/es/theme/internal';
import { message, Table } from 'antd';
const Doctor = () => {
    const [doctors, setDoctror] = useState([]);
    const getDoctor = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllDocter', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setDoctror(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDoctor()
    }, [])

    // handle account status

    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccounStatus',
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload();
            }
        } catch (error) {
            message.error('Something went Wrong')
        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )

        },
        {
            title: "Status",
            dataIndex: "status",
        },

        {
            title: "Email",
            dataIndex: 'email',
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },

        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'Pending' ? <button className="btn btn-success" onClick={() => handleAccountStatus(record, 'approved')}>Approve</button> :
                        <button className="btn btn-danger">Reject</button>}
                </div>
            )
        }

    ]

    return (

        <Layout>
            <h1 className='text-center m-2'>All doctors are here</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctor