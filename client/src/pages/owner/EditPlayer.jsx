import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import secureApi from '../../api/secureApi';

const EditPlayer = () => {
    const [position, setPosition] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await secureApi.put(`/owners/update-player/${id}`, { position });
            if (response.success) {
                // Handle success, maybe redirect or show a success message
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/dashboard/players');
                }, 1200)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message);
        }
    };

    return (
        <div className='container'>
            <h3>Edit Player</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <select
                        className="form-control"
                        id="position"
                        value={position}
                        onChange={handlePositionChange}
                        required
                    >
                        <option value={''}>Choose</option>
                        <option value="In-field">In-field</option>
                        <option value="Out-field">Out-field</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditPlayer;