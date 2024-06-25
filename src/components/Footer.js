import React from 'react';
import '../styles.css';

export default function Footer() {
    // Dynamically displaying the current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <p className='footer-text'>
            © {currentYear} Moviedux, All rights reserved.
            </p>
        </footer>
    );
}