// frontend/src/pages/UserPage.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout', {}, { withCredentials: true });
            alert('Logged out successfully');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out');
        }
    };

    return (
        <div>
            <h1>Welcome, User</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserPage;
