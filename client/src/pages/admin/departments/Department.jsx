import React, { useState, useEffect } from 'react';
import secureApi from '../../../api/secureApi';

const Department = () => {
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await secureApi.get('/departments');
                setDepartment(response.data); // Assuming 'data' contains the department object
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDepartment();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h3 className="text-center mt-2 mb-4">Department Details</h3>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td className="font-weight-bold">ID</td>
                        <td>{department.id}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Name</td>
                        <td>{department.name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Department;
