import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import secureApi from '../api/secureApi';

const OrganizerRoutes = ({ children }) => {
    const [userRole, setUserRole] = useState(null); // Set initial state to null or an empty object
    const id = localStorage.getItem('id');

    useEffect(() => {
        async function fetchUserRole() {
            try {
                const response = await secureApi.get(`/users/${id}`);
                setUserRole(response.data);
            } catch (error) {
                // Handle error if API request fails
                console.error('Error fetching user role:', error);
            }
        }

        if (id) {
            fetchUserRole();
        } else {
            // If id is not available, set user role to null
            setUserRole(null);
        }
    }, [id]);

    // Render based on user role
    if (!userRole) {
        // Render loading state or redirect to login if user role is being fetched
        return <div className='text-center p-5 text-danger'>Loading....</div>; // Replace LoadingComponent with your loading indicator
    } else if (userRole.role === 'organizer') {
        // Render children if user is an admin
        return children;
    } else {
        // Redirect to login if user is not an admin
        return <Navigate to="/login" />;
    }
};

export default OrganizerRoutes;
