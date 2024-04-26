import React, { useState } from 'react';
import secureApi from '../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePlayer = () => {
    const [uniId, setUniId] = useState('');
    const [user, setUser] = useState(null);
    const [position, setPosition] = useState('in-field');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await secureApi.get(`/owners/get-user/${uniId}`);
            if (response.success) {
                setUser(response.data);
                setError(null);
            } else {
                setError(response.message);
                setUser(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUniId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUser();
    };

    // 
    const handlePlayerSubmit = async (e) => {
        e.preventDefault();
        const owner_id = localStorage.getItem('id');
        const data = {
            owner_id,
            uni_id: uniId,
            position,
        };

        try {
            const result = await secureApi.post(`/owners/my-players`, data)
            if (result.success == true) {
                toast.success('Player saved successfully')
                setTimeout(() => {
                    navigate('/dashboard/players')
                }, 1200)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="container">
            <h3>Create Player</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="uniId" className="form-label">University ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="uniId"
                        value={uniId}
                        onChange={handleChange}
                        placeholder="Enter University ID"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {loading && <p>Loading...</p>}

            {error && <p>Error: {error}</p>}

            {user && (
                <div className="card mt-3">
                    <div className="row g-0">
                        <div className="col-md-4 p-5">
                            <img src={user.photo} alt={user.username} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2>{user.username}</h2>
                                <p className="card-text">Email: {user.email}</p>
                                <p className="card-text">Phone: {user.phone}</p>
                                <p className="card-text">Department: {user.dept_id == 1 && 'CSE'}</p>
                                <p className="card-text">Role: {user.role}</p>
                                <p className="card-text">ID: {user.user_id}</p>
                                <p className="card-text"><small className="text-muted">Created At: {new Date(user.created_at).toLocaleString()}</small></p>
                                <p className="card-text"><small className="text-muted">Updated At: {new Date(user.updated_at).toLocaleString()}</small></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='px-5 pb-4'>
                        <form onSubmit={handlePlayerSubmit}>
                            <div className="mb-3">
                                <label htmlFor="position" className="form-label">Position: </label>
                                <select
                                    className="form-select"
                                    id="position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    required
                                >
                                    <option value="">Select Position</option>
                                    <option value="In-field">In-field</option>
                                    <option value="Out-field">Out-field</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Add Player</button>
                        </form>
                    </div>

                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CreatePlayer;
