import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (err) {
                setError('Failed to load profile: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await ApiService.updateUser(user);
            setSuccess('Profile updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);

        } catch (err) {
            setError('Update failed: ' + err.message);
            setSuccess('');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            try {
                await ApiService.deleteUser(user.id);
                localStorage.clear();
                navigate('/signup');
            } catch (err) {
                setError('Delete failed: ' + err.message);
            }
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
            />

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
            />

            <label>Phone Number:</label>
            <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
            />

            <div>
                <button
                    className="update-profile-button"
                    onClick={handleUpdate}
                >
                    Update Profile
                </button>
                <button
                    className="delete-profile-button"
                    onClick={handleDelete}
                >
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default EditProfilePage;
