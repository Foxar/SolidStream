
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="links">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/test">Test page</Link></div>
                <div><Link to="/player">Player</Link></div>
                <div><Link to="/login">Login</Link></div>
                <div><Link to="/streamingpanel">Streaming</Link></div>
            </div>
            <div className="profile">
                <p>Logged in as:</p>
                <p className="loggedInAs">{Cookies.get('username')}</p>
            </div>
        </div>
    );
}