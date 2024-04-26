import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import Pagination from 'rc-pagination/lib/Pagination';

const Owners = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(null);
    const itemsPerPage = 10;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterOwners(e.target.value);
    };

    const filterOwners = (term) => {
        const filteredData = data.filter(owner =>
            owner.username.toLowerCase().includes(term.toLowerCase()) ||
            owner.email.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredOwners(filteredData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await secureApi.get(`/users/all-team-owners?currentPage=${currentPage}&limit=${itemsPerPage}&username=${searchTerm}&email=${searchTerm}`);
                setData(response.data.data);
                setTotal(response.data.total);
                setFilteredOwners(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, currentPage, itemsPerPage]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h2>Team Owners</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>
            {
                filteredOwners.length == 0 ? <p>No team owners found..</p>
                    :
                    <>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Photo</th>
                                    <th>User ID</th>
                                    <th>Department ID</th>
                                    {/* <th>Role</th>
                                    <th>Status</th> */}
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOwners.map((owner) => (
                                    <tr key={owner.id}>
                                        <td>{owner.id}</td>
                                        <td>{owner.username}</td>
                                        <td>{owner.email}</td>
                                        <td>{owner.phone}</td>
                                        <td>
                                            <img src={owner.photo} alt="Owner" style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{owner.user_id}</td>
                                        <td>{owner.dept_id == 1 ? 'CSE' : ''}</td>
                                        {/* <td>{owner.role}</td>
                                        <td>{owner.status}</td> */}
                                        <td>{new Date(owner.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            current={currentPage}
                            total={total}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                            jumpPrevIcon="..."
                            jumpNextIcon="..."
                        />
                    </>
            }
        </div>
    );
};

export default Owners;
