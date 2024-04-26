import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const organizerId = localStorage.getItem('id');

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const response = await secureApi.get(`/announcements/organizer/${organizerId}`);
            setAnnouncements(response.data); // Assuming data is an array
            setLoading(false);
        } catch (err) {
            // console.log(err)
            setError(err.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [organizerId]);

    const handleDelete = async (id) => {
        try {
            const response = await secureApi.delete(`/announcements/${id}`);
            if (response.success) {
                toast.success('Deleted announcement  successfully')
                fetchAnnouncements();
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }


    return (
        <div className='container'>
            <h3>Announcements</h3>
            <Link to='/dashboard/create-announcement' className='btn btn-primary mb-3'>Create Announcement</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement) => (
                        <tr key={announcement.id}>
                            <td>{announcement.id}</td>
                            <td>{announcement.title}</td>
                            <td>{announcement.description}</td>
                            <td>{new Date(announcement.created_at).toLocaleString()}</td>
                            <td>
                                <Link to={`/dashboard/edit-announcement/${announcement.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                <button onClick={() => handleDelete(announcement.id)} className="btn btn-sm btn-danger ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Announcements;
