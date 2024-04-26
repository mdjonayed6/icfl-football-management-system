import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../shared/Footer';
import Sidebar from '../shared/Sidebar';

const MainLayout = () => {
    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
            <ScrollRestoration />
        </div>
    );
};

export default MainLayout;