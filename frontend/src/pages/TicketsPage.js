import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketsPage.css';

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]); // For filtered tickets
    const [categories, setCategories] = useState([]); // Categories for the dropdown
    const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [userId, setUserId] = useState(null); // State to store userId

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets?page=${page}&limit=14`);
                setTickets(response.data.tickets);
                setFilteredTickets(response.data.tickets); // Initialize filteredTickets
                setTotal(response.data.total);

                // Extract unique categories from the tickets
                const uniqueCategories = [...new Set(response.data.tickets.map(ticket => ticket.category))];
                setCategories(uniqueCategories);

                // Get userId from localStorage
                const storedUserId = localStorage.getItem('userId');
                setUserId(storedUserId); // Update state with userId
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [page]);

    const totalPages = Math.ceil(total / 14);

    const handleCategoryChange = (event) => {
        const selected = event.target.value;
        setSelectedCategory(selected);

        // Filter tickets based on selected category
        if (selected) {
            const filtered = tickets.filter(ticket => ticket.category === selected);
            setFilteredTickets(filtered);
        } else {
            setFilteredTickets(tickets); // Show all tickets if no category is selected
        }
    };

    const handleReserve = async (ticketId) => {
        if (!userId) {
            alert('User not logged in!');
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:5000/api/tickets/${ticketId}/reserve`,
                { reserved: true, reservedBy: userId }
            );
            if (response.status === 200) {
                setTickets(tickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, reserved: true } : ticket
                ));
                setFilteredTickets(filteredTickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, reserved: true } : ticket
                ));
                alert('Ticket reserved successfully!');
            }
        } catch (error) {
            console.error('Error reserving ticket:', error);
            alert('Failed to reserve the ticket.');
        }
    };

    return (
        <div>
            <div className="filter-container">
                <label htmlFor="category-filter">Filter by Category:</label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="ticket-grid">
                {filteredTickets.map((ticket) => (
                    <div key={ticket._id} className="ticket-card">
                        <h2>{ticket.title}</h2>
                        <p>Category: {ticket.category}</p>
                        <p>Issuer: {ticket.issuer}</p>
                        <p>Price: ${ticket.price}</p>
                        {ticket.seat && <p>Seat: {ticket.seat}</p>}
                        <p>{ticket.reserved ? 'Reserved' : 'Available'}</p>
                        <button
                            onClick={() => handleReserve(ticket._id)}
                            disabled={!userId || ticket.reserved}
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

/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketsPage.css';

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [userId, setUserId] = useState(null); // State to store userId

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets?page=${page}&limit=14`);
                setTickets(response.data.tickets);
                setTotal(response.data.total);

                // Get userId from localStorage
                const storedUserId = localStorage.getItem('userId');
                setUserId(storedUserId); // Update state with userId
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [page]);

    const totalPages = Math.ceil(total / 14);

    // Function to handle reserving a ticket
    const handleReserve = async (ticketId) => {
        if (!userId) {
            alert('User not logged in!');
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:5000/api/tickets/${ticketId}/reserve`,
                { reserved: true, reservedBy: userId } // Include userId in the request body
            );
            if (response.status === 200) {
                setTickets(tickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, reserved: true } : ticket
                ));
                alert('Ticket reserved successfully!');
            }
        } catch (error) {
            console.error('Error reserving ticket:', error);
            alert('Failed to reserve the ticket.');
        }
    };

    return (
        <div>
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
                            disabled={!userId || ticket.reserved} // Disable if no userId or ticket is reserved
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

*/
