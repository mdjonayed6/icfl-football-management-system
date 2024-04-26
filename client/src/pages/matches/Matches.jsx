import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const organizerId = localStorage.getItem('id');

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            try {
                const response = await secureApi.get(`/matches/${organizerId}`);
                setMatches(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMatches();
    }, [organizerId]);

    const handleEdit = (matchId) => {
        // Navigate to the edit match page with the matchId
        // Example: history.push(`/dashboard/edit-match/${matchId}`);
        console.log(`Edit match with ID: ${matchId}`);
    };

    const handleDelete = async (matchId) => {
        try {
            // Delete the match using the API
            await secureApi.delete(`/matches/single/${matchId}`);
            toast.success('Deleted successfully');
            // Refresh the matches list
            const response = await secureApi.get(`/matches/${organizerId}`);
            setMatches(response.data);
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

    return (
        <div className='container'>
            <h3>Matches</h3>
            <Link to={`/dashboard/create-matches`} className="btn btn-primary mb-3">Create Match</Link>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
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
                                <Link to={`/dashboard/match-edit/${match.match_id}`}><button className="btn btn-sm btn-warning">Edit</button></Link>
                                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(match.match_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Matches;
