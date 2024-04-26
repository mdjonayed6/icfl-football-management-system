import React, { useState } from 'react';
import axios from 'axios';
import secureApi from '../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const CreatePerformance = () => {
    const currentYear = new Date().getFullYear();

    const [formData, setFormData] = useState({
        user_id: '',
        goals: '',
        yc: '',
        rc: '',
        assists: '',
        season: currentYear.toString()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await secureApi.post('/dashboard/performance', formData);
            if (response.success == true) {
                toast.success('Performance added successfully');
                setFormData({
                    user_id: '',
                    goals: '',
                    yc: '',
                    rc: '',
                    assists: '',
                    season: currentYear.toString()
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error saving performance:', error);
            toast.error('Error saving performance');
        }
    };

    return (
        <div className="container py-5">
            <h3 className="mb-4">Create Performance</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="userId" 
                        name="user_id" 
                        value={formData.user_id} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="goals" className="form-label">Goals:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="goals" 
                        name="goals" 
                        value={formData.goals} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="yc" className="form-label">Yellow Cards:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="yc" 
                        name="yc" 
                        value={formData.yc} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rc" className="form-label">Red Cards:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="rc" 
                        name="rc" 
                        value={formData.rc} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="assists" className="form-label">Assists:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="assists" 
                        name="assists" 
                        value={formData.assists} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="season" className="form-label">Season:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="season" 
                        name="season" 
                        value={formData.season} 
                        onChange={handleChange} 
                        required 
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Performance</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreatePerformance;
