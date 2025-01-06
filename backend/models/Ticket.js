const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the ticket
    eventId: { type: String, required: true }, // ID of the event
    seat: { type: String, required: false }, // Optional: Row and seat number
    category: { type: String, enum: ['concert', 'film', 'event'], required: true }, // Category
    issuer: { type: String, required: true }, // Issuer of the ticket
    price: { type: Number, required: true }, // Price of the ticket
    reserved: { type: Boolean, default: false }, // Reserved status
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // User who reserved the ticket
});

module.exports = mongoose.model('Ticket', TicketSchema);
