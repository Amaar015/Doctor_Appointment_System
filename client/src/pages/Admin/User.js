import React, { useEffect, useState } from 'react'
import Layout from '../../componets/Layout'
import axios from 'axios'
import { Table } from 'antd'
const User = () => {
    const [users, setusers] = useState([])

    //   get all user
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setusers(res.data.data)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    //   AntD tbale col

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Doctor",
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
            <h1 className='text-center m-2'>Show all Users</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default User