import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import secureApi from '../../../api/secureApi';

const CreateAnnouncements = () => {
    const [formData, setFormData] = useState({
        organizer_id: localStorage.getItem('id'),
        title: '',
        description: ''
    });

    const navigate = useNavigate();

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
            const response = await secureApi.post('/announcements', formData);
            if (response.success) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/dashboard/announcements');
                }, 1200)
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className='container'>
            <h3>Create Announcement</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Announcement</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateAnnouncements;
