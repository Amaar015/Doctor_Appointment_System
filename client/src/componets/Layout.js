import React from 'react';
import '../style/LayoutStyle.css';

const Layout = ({ children }) => {
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">logo</div>
                        <div className="menu">menu</div>
                    </div>
                    <div className="content">
                        <div className="header">header</div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout