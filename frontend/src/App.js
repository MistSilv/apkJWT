import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage.js';
import TicketsPage from './pages/TicketsPage';
import UserPage from './pages/UserPage';

function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated'); // Adjust based on your auth logic
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    <Route path="/profile" element={<UserPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user" element={
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    }
                />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
