import React, { useEffect, useState } from 'react';
import secureApi from '../../api/secureApi';

const AnnouncementsOwner = () => {
    const [announcements, setAnnouncements] = useState([]);
    const ownerId = localStorage.getItem('id');

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await secureApi.get(`/owners/announcements/${ownerId}`);
                if (response.success) {
                    setAnnouncements(response.data);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [ownerId]);

    return (
        <div className='container'>
            <h3>Announcements</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement) => (
                        <tr key={announcement.announcement_id}>
                            <td>{announcement.title}</td>
                            <td>{announcement.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsOwner;
