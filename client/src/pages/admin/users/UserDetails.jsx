import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await secureApi.get(`/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container pt-5">
            <div className="row">
                {/* Left Column: User Image and Username */}
                <div className="col-md-4">
                    <img src={user?.photo} alt={user?.username} className="img-fluid rounded-circle mb-3" style={{ width: '200px' }} />
                    <h4 className='ml-5'>{user?.username}</h4>
                </div>
                {/* Right Column: User Details */}
                <div className="col-md-8">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone</strong></td>
                                <td>{user?.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>User ID</strong></td>
                                <td>{user?.user_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Department </strong></td>
                                <td>{user?.dept_id == 1 && 'CSE'}</td>
                            </tr>
                            <tr>
                                <td><strong>Role</strong></td>
                                <td>{user?.role}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{new Date(user?.created_at).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Updated At</strong></td>
                                <td>{new Date(user?.updated_at).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
