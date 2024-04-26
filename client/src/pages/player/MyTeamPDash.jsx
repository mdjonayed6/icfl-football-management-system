import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import { Link } from 'react-router-dom';

const MyTeamPDash = () => {
    const id = localStorage.getItem('id');
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await secureApi.get(`/players/my-team/${id}`);
                if (response.success) {
                    setTeamData(response.data[0]);
                    setError(null);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3>My Team</h3>
            {teamData ? (
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={teamData.photo} className="img-fluid" alt={teamData.team_name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className='font-weight-bold'>{teamData.team_name}</h2>
                                <p className="card-text">Owner: {teamData.owner_name}</p>
                                <p className="card-text">Batch Year: {teamData.batch_year}</p>
                                <p className="card-text">Season: {teamData.season}</p>
                                <div className="row mt-3">
                                    <div className="col">
                                        <Link to={`/dashboard/player-match-schedule/${teamData.team_id}`} className="btn btn-primary me-2">Match Schedule</Link>
                                        <Link to={`/dashboard/player-team-mate/${teamData.team_id}`} className="btn btn-secondary ml-2">View Teammates</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No team found.</p>
            )}
        </div>
    );
};

export default MyTeamPDash;
