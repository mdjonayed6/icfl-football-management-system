import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const Rules = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('id');

    const fetchRules = async () => {
        setLoading(true);
        try {
            const response = await secureApi.get(`/rules/all/${id}`);
            setRules(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDelete = async (ruleId) => {
        try {
            await secureApi.delete(`/rules/${ruleId}`);
            setRules(rules.filter(rule => rule.id !== ruleId));
            toast.success('Rule deleted successfully');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h3>Rules</h3>
            <Link to='/dashboard/create-rule' className="btn btn-primary mb-3">Create Rule</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map((rule) => (
                        <tr key={rule.id}>
                            <td>{rule.match_id}</td>
                            <td>{rule.title}</td>
                            <td>{rule.description}</td>
                            <td>{new Date(rule.created_at).toLocaleString()}</td>
                            <td>
                                <Link to={`/dashboard/edit-rule/${rule.id}`}> <button className="btn btn-sm btn-primary">Edit</button></Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rule.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Rules;
