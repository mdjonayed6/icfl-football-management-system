import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';

const PlayAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await secureApi.get('/players/announcements/myteam');
                if (response.success) {
                    setAnnouncements(response.data);
                    setError(null);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3>Announcements</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement) => (
                        <tr key={announcement.id}>
                            <td>{announcement.title}</td>
                            <td>{announcement.description}</td>
                            <td>{new Date(announcement.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayAnnouncement;
