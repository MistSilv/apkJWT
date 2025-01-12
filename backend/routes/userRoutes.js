const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', { email, password }); // Debug request

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email); // Debug missing user
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for user:', email); // Debug invalid password
            return res.status(401).json({ message: 'Incorrect login or password' });
        }

        // Attempt to set session
        req.session.user = { id: user._id, name: user.name, role: user.role };
        console.log('Session created for user:', req.session.user);

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error('Error during login:', error); // Debug any errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err); // Debug session destruction errors
                return res.status(500).json({ message: 'Logout failed', error: err.message });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            console.log('Session destroyed and user logged out');
            res.status(200).json({ message: 'Logout successful' });
        });
    } else {
        res.status(400).json({ message: 'No active session found' });
    }
});



module.exports = router;
