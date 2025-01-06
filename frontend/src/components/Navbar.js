// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h1 style={styles.logo}>Rezervex</h1>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/register" style={styles.navLink}>Register</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/login" style={styles.navLink}>Login</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/tickets" style={styles.navLink}>Tickets</Link>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '15px',
    },
    navItem: {},
    navLink: {
        textDecoration: 'none',
        color: '#fff',
    },
};

export default Navbar;
