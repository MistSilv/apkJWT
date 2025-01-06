/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketsPage.css';

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets?page=${page}&limit=14`);
                setTickets(response.data.tickets);
                setTotal(response.data.total);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [page]);

    const totalPages = Math.ceil(total / 14);

    return (
        <div>
            <h1>Tickets</h1>
            <div className="ticket-grid">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="ticket-card">
                        <h2>{ticket.title}</h2>
                        <p>Category: {ticket.category}</p>
                        <p>Issuer: {ticket.issuer}</p>
                        <p>Price: ${ticket.price}</p>
                        {ticket.seat && <p>Seat: {ticket.seat}</p>}
                        <p>{ticket.reserved ? 'Reserved' : 'Available'}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default TicketsPage;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketsPage.css'; // Ensure you import the CSS file for styling

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets?page=${page}&limit=14`);
                setTickets(response.data.tickets);
                setTotal(response.data.total);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [page]);

    const totalPages = Math.ceil(total / 14);  // Adjust total pages based on the number of cards per page (14 in this case)

    // Function to handle reserving a ticket
    const handleReserve = async (ticketId) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/tickets/${ticketId}/reserve`, { reserved: true });
            if (response.status === 200) {
                setTickets(tickets.map(ticket => 
                    ticket._id === ticketId ? { ...ticket, reserved: true } : ticket
                ));
            }
        } catch (error) {
            console.error('Error reserving ticket:', error);
        }
    };

    return (
        <div>
            <h1>Tickets</h1>
            <div className="ticket-grid">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="ticket-card">
                        <h2>{ticket.title}</h2>
                        <p>Category: {ticket.category}</p>
                        <p>Issuer: {ticket.issuer}</p>
                        <p>Price: ${ticket.price}</p>
                        {ticket.seat && <p>Seat: {ticket.seat}</p>}
                        <p>{ticket.reserved ? 'Reserved' : 'Available'}</p>
                        <button 
                            onClick={() => handleReserve(ticket._id)}
                            disabled={ticket.reserved}
                            className="reserve-button"
                        >
                            {ticket.reserved ? 'Reserved' : 'Reserve'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default TicketsPage;
