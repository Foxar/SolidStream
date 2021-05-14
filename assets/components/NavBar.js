
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/test">Test page</Link></div>
            <div><Link to="/player">Player</Link></div>
        </div>
    );
}