import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', loginData);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('token', response.data.user.role);
            alert(response.data.message);
            navigate('/tickets');
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', registerData);
            alert(response.data.message);
        } catch (error) {
            console.error('Error registering user:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-page">
            {isLogin ? (
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <div className="register-form">
                    <h1>Register</h1>
                    <form onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}
            <button className="toggle-button" onClick={handleToggle}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
}

export default AuthPage;
