import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import Pagination from 'rc-pagination/lib/Pagination';
import Swal from 'sweetalert2';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(null);
    const itemsPerPage = 10;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await secureApi.get(`/users/all?currentPage=${currentPage}&limit=${itemsPerPage}&username=${searchTerm}&email=${searchTerm}`);
                setUsers(response.data.data);
                setTotal(response.data.total);
                setFilteredUsers(response.data.data); // Set filtered users initially with all users
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [searchTerm, currentPage, itemsPerPage]); // Run useEffect when searchTerm changes

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterUsers(e.target.value);
    };

    const filterUsers = (term) => {
        const filteredData = users.filter(user =>
            user.username.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filteredData);
    };

    const refetchUsers = async () => {
        try {
            const response = await secureApi.get(`/users/all?currentPage=${currentPage}&limit=${itemsPerPage}&username=${searchTerm}&email=${searchTerm}`);
            setUsers(response.data.data);
            setTotal(response.data.total);
            setFilteredUsers(response.data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete Users
    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await secureApi.delete(`/users/${id}`);
                    if (response.success === true) { // Check response.data.success
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                        );
                        refetchUsers()
                    }
                } catch (err) {
                    setError(err.message);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the user.",
                        icon: "error"
                    });
                }
            }
        });
    };




    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container pt-2'>
            <h3>Users</h3>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>
            <Link to="/dashboard/create-user" className='btn btn-primary mb-3'>Create User</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/dashboard/user-details/${user.id}`} className='btn btn-sm btn-primary mr-2'>View</Link>
                                <Link to={`/dashboard/edit-user/${user.id}`} className='btn btn-sm btn-primary mr-2'>Edit</Link>
                                {/* Add delete functionality if needed */}
                                <button onClick={() => deleteUser(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                            </td>
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
        </div>
    );
};

export default Users;
