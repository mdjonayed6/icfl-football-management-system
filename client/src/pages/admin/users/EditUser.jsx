import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureApi from '../../../api/secureApi';

const EditUser = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        photo: null,
        user_id: '',
        dept_id: '1',
        role: ''
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await secureApi.get(`/users/${id}`);
                const userData = response.data;
                setFormData({
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    photo: null, // You can keep it null or set a placeholder
                    user_id: userData.user_id,
                    dept_id: userData.dept_id,
                    role: userData.role
                });
            } catch (err) {
                toast.error('Error fetching user:', err.message);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'photo' ? files[0] : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/v1/users/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/dashboard/users');
                }, 1200)
            }
        } catch (err) {
            toast.error('Error updating user:', err.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="photo">Photo</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="photo"
                                name="photo"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="dept_id">Department</label>
                            <select
                                className="form-control"
                                id="dept_id"
                                name="dept_id"
                                value={formData.dept_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="1">CSE</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="organizer">Organizer</option>
                                <option value="player">Player</option>
                                <option value="owner">Team Owner</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditUser;
