import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await axios.post('/api/users/login', { email, password });
        //     alert(response.data.message);
        //     navigate('/user'); // Redirect to user page after login
        // } catch (error) {
        //     console.error('Login error:', error);
        //     alert(error.response?.data?.message || 'Login failed');
        // }
        try {
            console.log('Sending login data:', { email, password }); // Debug log
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('Login response:', response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Login failed spectacularry');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;
