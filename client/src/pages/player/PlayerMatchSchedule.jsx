import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../api/secureApi';

const PlayerMatchSchedule = () => {
    const { id } = useParams();
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchSchedule = async () => {
            try {
                const response = await secureApi.get(`/players/player-match-schedule/${id}`);
                if (response.success) {
                    setMatchData(response.data);
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

        fetchMatchSchedule();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3>Match Schedule</h3>
            {matchData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            <th>Team 1 Score</th>
                            <th>Team 2 Score</th>
                            <th>Match Date</th>
                            <th>Match Time</th>
                            <th>Match Status</th>
                            <th>Referee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchData.map((match) => (
                            <tr key={match.match_id}>
                                <td>{match.match_id}</td>
                                <td>{match.team1_name}</td>
                                <td>{match.team2_name}</td>
                                <td>{match.team1_score}</td>
                                <td>{match.team2_score}</td>
                                <td>{match.match_date}</td>
                                <td>{match.match_time}</td>
                                <td>{match.match_status}</td>
                                <td>{match.referee_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No match schedule found.</p>
            )}
        </div>
    );
};

export default PlayerMatchSchedule;
