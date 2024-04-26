import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import { toast } from 'react-toastify';

const EditRule = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        match_id: '',
        organizer_id: '',
        title: '',
        description: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchRule = async () => {
        try {
            const response = await secureApi.get(`/rules/${id}`);
            if (response.success) {
                setFormData(response.data);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };
    useEffect(() => {
        fetchRule();
    }, [id]);

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
            const response = await secureApi.put(`/rules/${id}`, formData);
            if (response.success) {
                // Redirect to rules page after successful update
                navigate('/dashboard/rules');
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    if (!formData) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container'>
            <h3>Edit Rule</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="match_id" className="form-label">Match ID</label>
                    <input type="text" className="form-control" id="match_id" name="match_id" value={formData.match_id} onChange={handleChange} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update Rule</button>
            </form>
        </div>
    );
};

export default EditRule;
