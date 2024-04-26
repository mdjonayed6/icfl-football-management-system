import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';

const RefereeMatch = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await secureApi.get('/referees/my-match/17');
                if (response.success) {
                    setMatches(response.data);
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

        fetchMatches();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3>My Match Schedule</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Match Date</th>
                        <th>Match Time</th>
                        <th>Match Status</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
                        <tr key={match.match_id}>
                            <td>{match.match_id}</td>
                            <td>{match.team1_name}</td>
                            <td>{match.team2_name}</td>
                            <td>{new Date(match.match_date).toLocaleDateString()}</td>
                            <td>{match.match_time}</td>
                            <td>{match.match_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RefereeMatch;
