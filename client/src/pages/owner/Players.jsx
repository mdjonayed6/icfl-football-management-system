import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../api/secureApi';

const Players = () => {
    const ownerId = localStorage.getItem('id');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlayers = async () => {
        try {
            const response = await secureApi.get(`/owners/get-myplayer/${ownerId}`);
            if (response.success) {
                setPlayers(response.data);
                setError(null);
            } else {
                setError(response.message);
                setPlayers([]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deletePlayer = async (id) => {
        console.log(id)
        try {
            const response = await secureApi.delete(`/owners/delete-player/${id}`);
            console.log(response)
            if (response.success) {
                // Refresh the players list after successful deletion
                fetchPlayers();
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (players.length === 0) {
    //     return <h3 className='text-center p-5'>No players found.</h3>;
    // }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    return (
        <div className='container'>
            <h3>My Players</h3>
            <Link to={`/dashboard/create-player`} className="btn btn-primary">Create Player</Link>
            {
                players.length == 0 ?
                    <>
                        <h3 className='text-center p-5'>No players found.</h3>
                    </>
                    :
                    <>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Photo</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Position</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player) => (
                                    <tr key={player.player_id}>
                                        <td>{player.player_id}</td>
                                        <td>
                                            <img src={player.photo} alt={player.username} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        </td>
                                        <td>{player.username}</td>
                                        <td>{player.email}</td>
                                        <td>{player.phone}</td>
                                        <td>{player.dept_id === '1' ? 'CSE' : 'Other'}</td>
                                        <td>{player.role}</td>
                                        <td>{player.position}</td>
                                        <td>
                                            <Link to={`/dashboard/edit-player/${player.player_id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deletePlayer(player.player_id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            }
        </div>
    );
};

export default Players;
