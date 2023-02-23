import React from 'react'
import Layout from './../componets/Layout'
import { message, notification, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../Redux/features/alertSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const Notification = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleMarkAllRead = async (req, res) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.success);
                window.location.reload();
            } else {
                dispatch(hideLoading());
                message.error(res.data.succes)
            }

        } catch (err) {
            dispatch(hideLoading());
            console.log(err);
            message.error("Something went wrong")

        }
    }
    // delete the notification
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
            else {
                dispatch(hideLoading());
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h3 className='p-4 text-center'>Notification Page</h3>
            <Tabs>
                <Tabs.TabPane tab='Unread' key={0}>
                    <div className="d-flex justify-content-end">
                        <h5 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h5>
                    </div>
                    {user?.notification.map(notificationMsg => {
                        return (
                            <div className="card" onClick={() => navigate(notificationMsg.onClickPath)} style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        )
                    })}
                </Tabs.TabPane>

                <Tabs.TabPane tab='read' key={1}>
                    <div className="d-flex justify-content-end">
                        <h5 className='p-2 text-primary' style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>Delete All Read</h5>
                    </div>
                    {user?.SeenNotification.map(SeennotificationMsg => {
                        return (
                            <div className="card" onClick={() => navigate(SeennotificationMsg.onClickPath)} style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {SeennotificationMsg.message}
                                </div>
                            </div>
                        )
                    })}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification