import React, { useEffect, useState } from 'react';
import myInfoHooks from '../../hooks/myInfoHooks';
import MyTeam from '../owner/MyTeam';
import MyTeamPDash from '../player/MyTeamPDash';
import RefereeMatch from '../referee/RefereeMatch';
import PointsTable from './PointsTable';
import secureApi from '../../api/secureApi';
import { Link } from 'react-router-dom';

const Home = () => {
    const [myInfo, refetch] = myInfoHooks()
    const [counted, setCounted] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await secureApi.get(`/dashboard/count`);
                setCounted(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            {/* Content Wrapper. Contains page content */}

            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                    {
                        myInfo.role == 'admin' &&
                        <>
                            <div className="row">
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{counted?.totalUsers}</h3>
                                            <p>Users</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-bag" />
                                        </div>
                                        {/* <Link to="/dashboard/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link> */}
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>{counted?.totalTeams}</h3>
                                            <p>Teams</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-stats-bars" />
                                        </div>
                                        {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>{counted?.totalPlayer}</h3>
                                            <p>Players</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person-add" />
                                        </div>
                                        {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-3 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>{counted?.totalOwner}</h3>
                                            <p>Owners</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-pie-graph" />
                                        </div>
                                        {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
                                    </div>
                                </div>
                                {/* ./col */}
                            </div>
                            <PointsTable />
                        </>
                    }

                    {
                        myInfo.role == 'organizer' &&
                        <>
                            <PointsTable />
                        </>
                    }

                    {
                        myInfo.role == 'owner' &&
                        <>
                            <MyTeam />
                            <PointsTable />
                        </>
                    }

                    {
                        myInfo.role == 'player' &&
                        <>
                            <MyTeamPDash />
                            <PointsTable />
                        </>
                    }
                    {
                        myInfo.role == 'referee' &&
                        <>
                            <RefereeMatch />
                            <PointsTable />
                        </>
                    }

                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}

            {/* /.content-wrapper */}
        </div>

    );
};

export default Home;