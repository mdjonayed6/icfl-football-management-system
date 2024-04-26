import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const organizerId = localStorage.getItem('id');
    const [formData, setFormData] = useState({
        team_name: '',
        owner_id: '',
        organizer_id: organizerId,
        batch_year: '',
        season: new Date().getFullYear().toString(),
        photo: null,
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('team_name', formData.team_name);
        formDataToSend.append('owner_id', formData.owner_id);
        formDataToSend.append('organizer_id', formData.organizer_id);
        formDataToSend.append('batch_year', formData.batch_year);
        formDataToSend.append('season', formData.season);
        formDataToSend.append('photo', formData.photo);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/teams', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response)
            if (response.data.success == true) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/dashboard/teams')
                }, 1200)
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };

    return (
        <div className='container'>
            <h2>Create Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="team_name" className="form-label">Team Name</label>
                            <input type="text" className="form-control" id="team_name" name="team_name" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="owner_id" className="form-label">Owner ID</label>
                            <input type="text" className="form-control" id="owner_id" name="owner_id" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="organizer_id" className="form-label">Organizer ID</label>
                            <input type="text" className="form-control" id="organizer_id" value={formData.organizer_id} name="organizer_id" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="batch_year" className="form-label">Batch Year</label>
                            <input type="text" className="form-control" id="batch_year" name="batch_year" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="season" className="form-label">Season</label>
                            <input type="text" className="form-control" id="season" name="season" Value={formData.season} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Team Photo</label>
                            <input type="file" className="form-control" id="photo" name="photo" onChange={handleFileChange} required />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create Team</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateTeam;
