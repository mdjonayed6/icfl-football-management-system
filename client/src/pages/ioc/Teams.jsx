import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../api/secureApi';
import axios from 'axios';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const organizerId = localStorage.getItem('id');

    const fetchTeams = async () => {
        try {
            const response = await secureApi.get(`/teams/${organizerId}`);
            // console.log(response.data)
            setTeams(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchTeams();
    }, [organizerId]);

    const deleteTeam = async (id) => {
        try {
            // console.log(id)
            const response = await axios.delete(`http://localhost:5000/api/v1/teams/${id}`); //TODO:: SERVEER API
            // console.log(response)
            if (response.data.success) {
                // Remove the deleted team from the state
                fetchTeams()
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // if (teams.length === 0) {
    //     return <p>No teams found.</p>;
    // }

    return (
        <div className='container'>
            <h2>Teams</h2>
            <Link to={`/dashboard/create-team`} className='btn btn-primary mb-3'>Create Team</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Team Name</th>
                        <th>Owner</th>
                        <th>Phone</th>
                        <th>Batch Year</th>
                        <th>Season</th>
                        <th>Team Photo</th>
                        <th>Action</th> {/* Added Action column for Delete button */}
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td>{team.id}</td>
                            <td>{team.team_name}</td>
                            <td>
                                <img src={team.owner_photo} alt={team.owner_username} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <Link to={`/dashboard/owner-player/${team.owner_id}`}>{team.owner_username}</Link>
                            </td>
                            <td>
                                {team.owner_phone}
                            </td>
                            <td>{team.batch_year}</td>
                            <td>{team.season}</td>
                            <td>
                                <img src={team.team_photo} alt="Team" style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>
                                <button onClick={() => deleteTeam(team.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teams;
