import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminMenu, userSidebar } from '../Data/Data';
import '../style/LayoutStyle.css';
import { message } from 'antd';
const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        navigate('/login');
    }
    const Sidebar = user?.isAdmin ? AdminMenu : userSidebar;

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Doc App</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {Sidebar.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            <div className={`menu-item`} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">
                                <i className="fa-solid fa-bell"></i>
                                {/* <Link to='/profile'>Amaar</Link> */}
                                <Link to='/profile'>{user?.name}</Link>

                            </div>
                            {/* <h1>header</h1> */}
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout