import React, { useState } from 'react';
import secureApi from '../../../api/secureApi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
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
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:5000/api/v1/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success === true) {
                toast.success(response.data.message);
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    photo: null,
                    user_id: '',
                    dept_id: '1',
                    role: ''
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1200);
            }
        } catch (err) {
            // console.log(err)
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center">Registration Form</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
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
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        min={11}
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Photo</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="photo"
                                        name="photo"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dept_id" className="form-label">Department</label>
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
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        className="form-control"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="organizer">Organizer</option>
                                        <option value="player">Player</option>
                                        <option value="owner">Team Owner</option>
                                        <option value="referee">Referee</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="form-group">
                                        <label htmlFor="user_id">ID Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="user_id"
                                            name="user_id"
                                            value={formData.user_id}
                                            onChange={handleChange}
                                            required
                                            placeholder='Your ID'
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateUser;
