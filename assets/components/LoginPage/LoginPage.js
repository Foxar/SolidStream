import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Cookies from 'js-cookie';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveError = this.saveError.bind(this);
    }

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    saveError(msg) {
        this.setState({
            errorMessage: msg
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //Submit login data to backend, save the JWT token and save as a cookie to pass on 
        //with each next api call.
        const data = {
            "username": this.state.username,
            "password": this.state.password
        };
        const responsePromise = fetch('http://localhost:8000/api/login_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        responsePromise.then(response => {
            //If the login_check response is OK, save the JWT token:
            if (response.ok) {
                response.json().then(
                    data => {
                        Cookies.set('jwt-token', data.token);
                        this.saveError("");
                    }
                );
            } else {
                //Otherwise, display error message.
                if (response.status == 401) {
                    this.saveError("Invalid credentials!");
                }
                else
                    this.saveError("Unknown error!");
            }
        });
    }



    render() {
        return (
            <div className="loginPage">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <h4>Log in to SolidStream!</h4>
                    {this.state.errorMessage && (<p className="errorMessage">{this.state.errorMessage}</p>)}
                    <label>Username:</label>
                    <input type="text" value={this.state.username} onChange={this.handleUserChange}></input>

                    <label>Password:</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>

                    <input type="submit" value="Log in" />
                </form>
            </div>
        );
    }
}

export default LoginPage;