import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';

const MyTeam = () => {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('id');

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const response = await secureApi.get(`/owners/my-team/${id}`);
            setTeam(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!team) {
        return <p>No team found.</p>;
    }

    return (
        <div className="container">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={team.photo} className="img-fluid rounded-start" alt={team.team_name} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h1 className='font-weight-bold'>{team.team_name}</h1>
                            <p className="card-text">Owner ID: {team.owner_id}</p>
                            <p className="card-text">Batch Year: {team.batch_year}</p>
                            <p className="card-text">Season: {team.season}</p>
                            <p className="card-text"><small className="text-muted">Created At: {new Date(team.created_at).toLocaleString()}</small></p>
                            <p className="card-text"><small className="text-muted">Updated At: {new Date(team.updated_at).toLocaleString()}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
