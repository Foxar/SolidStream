import React, { Component } from 'react';
import ReactPlayer from 'react-player';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
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
            if (response.ok) {
                console.log("Valid login!");
                console.log("JWT Token: ");
                response.json().then(
                    data => {
                        console.log(data.token);
                    }
                );
            } else {
                console.log("Invalid login!");
                console.log(response.statusText);
                response.json().then(
                    data => {
                        console.log(data);
                    }
                );
            }
        });
    }



    render() {
        return (
            <div className="loginPage">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <h4>Log in to SolidStream!</h4>
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