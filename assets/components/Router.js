import React from 'react';
import PlayerPage from './PlayerView/PlayerPage.js'
import StreamPanel from './Streaming/StreamingPanel/StreamPanel'
import NavBar from './NavBar.js';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';

export default function AppRouter() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/test">
                    <h1>Test Page!</h1>
                </Route>
                <Route path="/player">
                    <PlayerPage />
                </Route>
                <Route path="/streamingpanel">
                    <StreamPanel />
                </Route>
                <Route path="/">
                    <h4> Welcome to SolidStream!</h4>
                </Route>
            </Switch>

        </Router>
    )
}
