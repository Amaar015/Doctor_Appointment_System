import React, { useEffect } from 'react'
import axios from 'axios';
import Layout from '../componets/Layout';
const HomePage = () => {
    const getUserData = async () => {
        try {
            const res = await axios.port('/api/v1/use/setUserData', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserData()
    })
    return (
        <Layout>
            <h1>HomePage</h1>
        </Layout>
    )
}

export default HomePage