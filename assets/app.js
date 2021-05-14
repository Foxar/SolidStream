/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';

import AppRouter from './components/Router.js';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
    render() {
        return (
            <div>
                <AppRouter />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));