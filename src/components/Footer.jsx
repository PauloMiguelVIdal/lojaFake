import React from 'react';

const Footer = () => (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: 'transparent' }}>
        <p>&copy; {new Date().getFullYear()} Fake Store. All rights reserved.</p>
    </footer>
);

export default Footer;