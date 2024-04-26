import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../api/secureApi';
import { toast } from 'react-toastify';

const EditMatch = () => {
    const { id } = useParams();
    const [matchData, setMatchData] = useState({
        team1_score: '',
        team2_score: '',
        match_date: '',
        match_time: '',
        match_status: 'upcoming',
        match_stage: 'normal'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMatch = async () => {

            try {
                const response = await secureApi.get(`/matches/single/${id}`);
                setMatchData(response.data);

            } catch (err) {
                setError(err.message);

            }
        };

        fetchMatch();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatchData({
            ...matchData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await secureApi.put(`/matches/single/${id}`, matchData);
            // console.log(response)
            if (response.success == true) {
                toast.success('Updated Successfully')
                setTimeout(() => {
                    navigate('/dashboard/matches')
                }, 1200)
                // Handle successful update, e.g., show a success message
            }
        } catch (err) {
            console.log(err)
            setError(err.message);

        }
    };

    return (
        <div className='container'>
            <h3>Edit Match</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="team1_score" className="form-label">Team 1 Score</label>
                    <input
                        type="text"
                        className="form-control"
                        id="team1_score"
                        name="team1_score"
                        value={matchData.team1_score}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="team2_score" className="form-label">Team 2 Score</label>
                    <input
                        type="text"
                        className="form-control"
                        id="team2_score"
                        name="team2_score"
                        value={matchData.team2_score}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="match_date" className="form-label">Match Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="match_date"
                        name="match_date"
                        value={matchData.match_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="match_time" className="form-label">Match Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="match_time"
                        name="match_time"
                        value={matchData.match_time}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="match_status" className="form-label">Match Status</label>
                    <select
                        className="form-select"
                        id="match_status"
                        name="match_status"
                        value={matchData.match_status}
                        onChange={handleChange}
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="match_stage" className="form-label">Match Stage</label>
                    <select
                        className="form-select"
                        id="match_stage"
                        name="match_stage"
                        value={matchData.match_stage}
                        onChange={handleChange}
                    >
                        <option value="upcoming">Normal</option>
                        <option value="Final">Final</option>
                        <option value="Semi-Final">Semi-Final</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Match</button>
            </form>
        </div>
    );
};

export default EditMatch;
