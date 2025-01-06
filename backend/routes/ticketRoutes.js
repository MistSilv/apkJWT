const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Create a ticket
router.post('/', async (req, res) => {
    console.log('POST /api/tickets called with body:', req.body); // Debug log
    const { title, eventId, seat, category, issuer, price } = req.body;

    try {
        const ticket = new Ticket({ title, eventId, seat, category, issuer, price });
        await ticket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
