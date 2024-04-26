import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../api/secureApi';

const MatchRules = () => {
    const { id } = useParams();
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRules = async () => {
        try {
            const result = await secureApi.get(`/owners/match-rules/${id}`);
            setRules(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching match rules:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h3>Match Rules</h3>
            {rules.length === 0 ? (
                <p>No rules found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map((rule) => (
                            <tr key={rule.id}>
                                <td>{rule.title}</td>
                                <td>{rule.description}</td>
                                <td>{new Date(rule.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MatchRules;
