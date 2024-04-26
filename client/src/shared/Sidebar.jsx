import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import myInfoHooks from '../hooks/myInfoHooks';
import axios from 'axios';

const Sidebar = () => {
    const [myInfo, refetch] = myInfoHooks()
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const handleLogout = () => {
        toast.success('Logout successful')
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('id')
            localStorage.removeItem('email')
            navigate('/login')
        }, 1200)
    }

    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/dashboard" className="brand-link">
                    {/* <img src="dist/img/avatar.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
                    <span className="brand-text ml-4 font-weight-light">ICFL 2024</span>
                </Link>
                {/* Sidebar */}
                {/* For Admin */}
                {
                    myInfo.role == 'admin' &&
                    <>
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={myInfo?.photo} className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <Link to={`/dashboard/user-details/${id}`} className="d-block">{myInfo?.username}</Link>
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Dashboard
                                            </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/dashboard/users" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Users
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/pending-organizer" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Pending Users
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/departments" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Departments
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/user-report" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                User  Report
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/points-table-report" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Points Table Report
                                            </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item" onClick={handleLogout}>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                    </>

                }

                {/* For Organizer */}
                {
                    myInfo.role == 'organizer' &&
                    <>
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={myInfo?.photo} className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <Link to={`/dashboard/user-details/${id}`} className="d-block">{myInfo?.username}</Link>
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Dashboard
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/owners" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Owners
                                            </p>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link to="/dashboard/pending-owners" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Pending Owners
                                            </p>
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link to="/dashboard/teams" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Teams
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/matches" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Matches
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/rules" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Rules
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/announcements" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Announcements
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/create-performance" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Performance
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={handleLogout}>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                    </>
                }

                {/* For Owner */}
                {
                    myInfo.role == 'owner' &&
                    <>
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={myInfo?.photo} className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <Link to={`/dashboard/user-details/${id}`} className="d-block">{myInfo?.username}</Link>
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Dashboard
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/players" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Players
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/match-schedule" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Match Schedule
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/owner-announcements" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Match Announcements
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={handleLogout}>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                    </>
                }

                {
                    myInfo.role == 'player' &&
                    <>
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={myInfo?.photo} className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <Link to={`/dashboard/user-details/${id}`} className="d-block">{myInfo?.username}</Link>
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Dashboard
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/myteam-announcements" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Announcements
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={handleLogout}>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                    </>
                }

                {
                    myInfo.role == 'referee' &&
                    <>
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={myInfo?.photo} className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <Link to={`/dashboard/user-details/${id}`} className="d-block">{myInfo?.username}</Link>
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Dashboard
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/myteam-announcements" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Announcements
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={handleLogout}>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>
                                                Logout
                                            </p>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                    </>
                }




                {/* /.sidebar */}
            </aside>
            <ToastContainer />
        </div>

    );
};

export default Sidebar;