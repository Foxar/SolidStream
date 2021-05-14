import React from 'react';
import PlayerPage from './PlayerView/PlayerPage.js'
import NavBar from './NavBar.js';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';

export default function AppRouter() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/test">
                    <h1>Test Page!</h1>
                </Route>
                <Route path="/player">
                    <PlayerPage />
                </Route>
                <Route path="/">
                    <h4> Welcome to SolidStream!</h4>
                </Route>
            </Switch>

        </Router>
    )
}
