import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`/api/tickets?page=${page}&limit=10`);
                setTickets(response.data.tickets);
                setTotal(response.data.total);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [page]);

    const totalPages = Math.ceil(total / 10);

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
