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
// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Save user info in session
//         req.session.user = {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//         };

//         res.status(200).json({ message: 'Login successful', user: req.session.user });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// const handleLogout = async () => {
//     try {
//         await axios.post('/api/users/logout');
//         localStorage.removeItem('isAuthenticated');
//         window.location.href = '/login'; // Redirect to login page
//     } catch (error) {
//         console.error('Logout error:', error);
//     }
// };

// router.get('/me', (req, res) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: 'Not authenticated' });
//     }
//     res.status(200).json({ user: req.session.user });
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('Login request received:', { email, password }); // Log request data

//     try {
//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found:', email); // Debug missing user
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Invalid password for user:', email); // Debug invalid password
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // If successful, create session
//         req.session.user = { id: user._id, name: user.name, role: user.role };
//         console.log('Login successful for user:', email); // Debug successful login
//         res.status(200).json({ message: 'Login successful', user: req.session.user });
//     } catch (error) {
//         console.error('Error during login:', error); // Debug server errors
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

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




module.exports = router;
