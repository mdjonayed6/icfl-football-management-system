import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import { Link } from 'react-router-dom';

const MatchSchedule = () => {
    const ownerId = localStorage.getItem('id');
    const [matchSchedule, setMatchSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMatchSchedule = async () => {
        try {
            const response = await secureApi.get(`/owners/match-schedule/${ownerId}`);
            if (response.success) {
                setMatchSchedule(response.data);
                setError(null);
            } else {
                setError(response.message);
                setMatchSchedule([]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatchSchedule();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (matchSchedule.length === 0) {
        return <p className='text-center p-5'>No matches scheduled.</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className='container'>
            <h3>Match Schedule</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Team 1 Score</th>
                        <th>Team 2 Score</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Referee</th>
                        <th>Rules</th>
                    </tr>
                </thead>
                <tbody>
                    {matchSchedule.map((match) => (
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
                            <td>
                                <Link to={`/dashboard/match-rules/${match.match_id}`}><button>Rules</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchSchedule;
