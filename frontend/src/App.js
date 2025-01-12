import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';


import TicketsPage from './pages/TicketsPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage.js';


function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('userID');
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    <Route path="/profile" element={<UserPage />} />
                    <Route path='/auth' element={<AuthPage/>} />
                    
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
