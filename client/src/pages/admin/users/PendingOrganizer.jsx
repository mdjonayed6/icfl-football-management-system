import React, { useState, useEffect } from 'react';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const PendingOrganizer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleApprove = async (id) => {
        try {
            await secureApi.put(`/users/${id}/accept`);
            // After updating the status, refetch the pending organizers
            toast.success('User Approved Successfully');
            setTimeout(() => {
                fetchData();
            }, 1200)
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchData = async () => {
        try {
            const response = await secureApi.get('/users/pending-organizer');
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (data.length === 0) {
        return <p className='text-danger text-center pt-5'>No pending users exist.</p>;
    }

    return (
        <div className='container'>
            <h2>Pending Users</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Photo</th>
                        <th>Uni. ID</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((organizer) => (
                        <tr key={organizer.id}>
                            <td>{organizer.id}</td>
                            <td>{organizer.username}</td>
                            <td>{organizer.email}</td>
                            <td>{organizer.phone}</td>
                            <td>
                                <img src={organizer.photo} alt="User" style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{organizer.user_id}</td>
                            <td>{organizer.role}</td>
                            <td>
                                <button onClick={() => handleApprove(organizer.id)} className="btn btn-success">Approve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default PendingOrganizer;
