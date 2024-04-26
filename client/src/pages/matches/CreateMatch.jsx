import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const CreateMatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [teams, setTeams] = useState([]);
    const [referees, setReferees] = useState([]);
    const organizerId = localStorage.getItem('id');

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const response = await secureApi.get(`/teams/${organizerId}`);
                setTeams(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchReferees = async () => {
            setLoading(true);
            try {
                const response = await secureApi.get('/users/all-referees');
                setReferees(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTeams();
        fetchReferees();
    }, [organizerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const team1 = e.target.team1_id.value
        const team2 = e.target.team2_id.value

        if (team1 === team2) {
            return toast.error('Team 1 and Team 2 cannot be same')
        }

        const formData = {
            team1_id: e.target.team1_id.value,
            team2_id: e.target.team2_id.value,
            team1_score: e.target.team1_score.value,
            team2_score: e.target.team2_score.value,
            match_date: e.target.match_date.value,
            match_time: e.target.match_time.value,
            organizer_id: e.target.organizer_id.value,
            referee_id: e.target.referee_id.value
        };

        // console.log(formData)

        try {
            const response = await secureApi.post('/matches', formData);
            if (response.success) {
                setSuccessMessage(response.message);
            } else {
                setError(response.message);
            }
            setLoading(false);
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    };


    return (
        <div className='container'>
            <h3>Create Match</h3>
            <hr />
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="team1_id" className="form-label">Team 1: </label>
                    <select className="form-select" id="team1_id" name="team1_id" required>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.team_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="team2_id" className="form-label">Team 2: </label>
                    <select className="form-select" id="team2_id" name="team2_id" required>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.team_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="referee_id" className="form-label">Referee</label>
                    <select className="form-select" id="referee_id" name="referee_id" required>
                        {referees.map((referee) => (
                            <option key={referee.id} value={referee.id}>{referee.username}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4" hidden>
                    <div className="mb-3">
                        <label htmlFor="team1_score" className="form-label">Team 1 Score</label>
                        <input type="text" className="form-control" id="team1_score" name="team1_score" />
                    </div>
                </div>
                <div className="col-md-4" hidden>
                    <div className="mb-3">
                        <label htmlFor="team2_score" className="form-label">Team 2 Score</label>
                        <input type="text" className="form-control" id="team2_score" name="team2_score" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="match_date" className="form-label">Match Date</label>
                    <input type="date" id="match_date" name="match_date" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="match_time" className="form-label">Match Time</label>
                    <input type="time" id="match_time" name="match_time" required />
                </div>
                <div className="mb-3" hidden>
                    <label htmlFor="organizer_id" className="form-label">Organizer ID</label>
                    <input type="text" id="organizer_id" name="organizer_id" value={organizerId} readOnly />
                </div>
                <button type="submit" className="btn btn-primary">Create Match</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateMatch;
