
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="navbar">
            <div><Link to="/">Home</Link></div>
            <div><Link to="/test">Test page</Link></div>
            <div><Link to="/player">Player</Link></div>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/streamingpanel">Streaming</Link></div>
        </div>
    );
}