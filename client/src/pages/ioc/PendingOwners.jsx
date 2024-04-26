import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const PendingOwners = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await secureApi.get('/users/pending-owner');
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

    const handleApprove = async (id) => {
        try {
            await secureApi.put(`/users/${id}/accept`);
            // After updating the status, refetch the pending organizers
            toast.success('Owners Approved Successfully');
            setTimeout(() => {
                fetchData();
            }, 1200)
        } catch (err) {
            setError(err.message);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (data.length == 0) {
        return <p className='text-center text-danger p-5 h5'>No pending owners exist.</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className='container'>
            <h3>Pending Owners</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Photo</th>
                        <th>User ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((owner) => (
                        <tr key={owner.id}>
                            <td>{owner.id}</td>
                            <td>{owner.username}</td>
                            <td>{owner.email}</td>
                            <td>{owner.phone}</td>
                            <td>
                                <img src={owner.photo} alt="Owner" style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{owner.user_id}</td>
                            <td>
                                <button onClick={() => handleApprove(owner.id)} className='btn btn-success'>Approve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default PendingOwners;
