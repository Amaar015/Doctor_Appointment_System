
import React, { useEffect, useState } from 'react'
import Layout from '../../componets/Layout'
import axios from 'axios'
import { genComponentStyleHook } from 'antd/es/theme/internal';
import { Table } from 'antd';
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

    const columns = [
        {
            title: "Name",
            dataIndex: "firstName",

        },
        {
            title: "Email",
            dataIndex: 'email',
        },
        {
            title: "doctor",
            dataIndex: "isDoctor",
            render: (text, record) => (
                <span>{record.isDoctor ? "yes" : "no"}</span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, recode) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
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