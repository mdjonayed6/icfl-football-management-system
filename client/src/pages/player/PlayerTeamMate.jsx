import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../api/secureApi';

const PlayerTeamMate = () => {
    const { id } = useParams();
    const [teammates, setTeammates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeammates = async () => {
            try {
                const response = await secureApi.get(`/players/my-teammate/${id}`);
                if (response.success) {
                    setTeammates(response.data);
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

        fetchTeammates();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3>My Teammates</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Uni ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {teammates.map((player) => (
                        <tr key={player.player_id}>
                            <td>{player.uni_id}</td>
                            <td>{player.username}</td>
                            <td>{player.email}</td>
                            <td>{player.phone}</td>
                            <td>{player.position}</td>
                            <td>
                                <img src={player.photo} height={50} width={50} alt="" srcset="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerTeamMate;
