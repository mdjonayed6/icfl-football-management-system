import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import secureApi from '../../api/secureApi';

const OwnerPlayer = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlayers = async () => {
        try {
            const response = await secureApi.get(`/owners/get-myplayer/${id}`);
            // console.log(response)
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

    useEffect(() => {
        fetchPlayers();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }



    return (
        <div className='container'>

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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            }
        </div>
    );
};

export default OwnerPlayer;
