import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import secureApi from '../../../api/secureApi';

const CreateRule = () => {
    const [formData, setFormData] = useState({
        match_id: '',
        organizer_id: localStorage.getItem('id'),
        title: '',
        description: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await secureApi.post('/rules/', formData);
            if (response.success == true) {
                toast.success('Rule successfully created.');
                setTimeout(() => {
                    navigate('/dashboard/rules');
                }, 1200)
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className='container'>
            <h3>Create Rule</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="match_id" className="form-label">Match ID</label>
                    <input type="text" className="form-control" id="match_id" name="match_id" value={formData.match_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Rule</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateRule;
