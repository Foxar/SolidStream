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
import RegistrationPage from './RegistrationPage/RegistrationPage.js';

export default function AppRouter() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegistrationPage />
                </Route>
                <Route path="/test">
                    <h1>Test Page!</h1>
                </Route>
                <Route path="/player/:id" component={PlayerPage} />
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
