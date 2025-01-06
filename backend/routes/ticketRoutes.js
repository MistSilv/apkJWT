const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Create a ticket
router.post('/', async (req, res) => {
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

// GET route to fetch tickets with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    try {
        const tickets = await Ticket.find()
            .skip((page - 1) * limit) // Skip tickets based on the page
            .limit(Number(limit)); // Limit the number of tickets per page

        const total = await Ticket.countDocuments(); // Get total number of tickets

        res.status(200).json({ tickets, total });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets' });
    }
});

router.patch('/:id/reserve', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        // Update the reserved field
        ticket.reserved = req.body.reserved;

        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error reserving ticket:', error);
        res.status(500).json({ message: 'Error reserving ticket' });
    }
});



module.exports = router;
