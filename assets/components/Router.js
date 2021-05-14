import React from 'react';
import PlayerPage from './PlayerView/PlayerPage.js'

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/test">
                    <h1>Test Page!</h1>
                </Route>
                <Route path="/player">
                    <PlayerPage />
                </Route>
                <Route path="/">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/test">Test page</Link></li>
                        <li><Link to="/player">Player</Link></li>
                    </ul>
                </Route>
            </Switch>

        </Router>
    )
}
