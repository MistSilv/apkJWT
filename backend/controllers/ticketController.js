const Ticket = require('../models/Ticket');

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.reserveTicket = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(req.user);
        const ticket = await Ticket.findById(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        if (ticket.reserved) return res.status(400).json({ message: 'Ticket already reserved' });

        ticket.reserved = true;
        ticket.reservedBy = req.user.id; // Attach the logged-in user's ID
        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
