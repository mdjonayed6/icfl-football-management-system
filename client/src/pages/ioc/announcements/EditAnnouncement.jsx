import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import { toast } from 'react-toastify';

const EditAnnouncement = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        organizer_id: '',
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const fetchAnnouncement = async () => {
        setLoading(true);
        try {
            const response = await secureApi.get(`/announcements/${id}`);
            setFormData(response.data); // Assuming data structure matches formData
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
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
            const response = await secureApi.put(`/announcements/${id}`, formData);
            if (response.success) {
                toast.success('Updated announcement successfully')
                setTimeout(() => {
                    navigate('/dashboard/announcements')
                }, 1200)
            }
        } catch (err) {
            setError(err.response.data.message);
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
            <h3>Edit Announcement</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="organizer_id" className="form-label">Organizer ID</label>
                    <input type="text" className="form-control" id="organizer_id" name="organizer_id" value={formData.organizer_id} onChange={handleChange} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update Announcement</button>
                <Link to="/dashboard/announcements" className="btn btn-secondary ml-2">Cancel</Link>
            </form>
        </div>
    );
};

export default EditAnnouncement;
