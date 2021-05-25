import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';



class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            error: false
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveError = this.saveError.bind(this);
        this.setTimedError = this.setTimedError.bind(this);
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
            errorMessage: msg,
            error: true
        });
    }

    setTimedError(msg, time = 5000) {
        this.setState({
            errorMessage: msg,
            error: true
        });
        setTimeout(() => {
            this.setState({
                errorMessage: "",
                error: false
            });
        }, time);
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
                        //Save the JWT token to a cookie, clear error messages.
                        Cookies.set('jwt-token', data.token);
                        this.saveError("");


                        //Fetch user entity of the user that has logged in.
                        fetch('http://localhost:8000/secureapi/currentUser', {
                            method: 'GET',
                            headers: {
                                'Authorization': 'BEARER '.concat(Cookies.get('jwt-token'))
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    response.json().then(
                                        data => {
                                            Cookies.set('username', data.username);
                                            Cookies.set('userid', data.id);
                                            window.location.assign("/");
                                        }
                                    );
                                } else {
                                    this.setTimedError("Unknown error!");
                                }
                            });
                    }
                );
            } else {
                //Otherwise, display error message.
                if (response.status == 401) {
                    this.setTimedError("Invalid credentials!");
                }
                else
                    this.setTimedError("Unknown error!");
            }
        });
    }



    render() {
        return (
            <Box className="loginPage" >
                <Paper className="loginForm" square={true} elevation={2}>
                    <form onSubmit={this.handleSubmit}>
                        <Typography variant='h5' gutterBottom>Sign in to your account</Typography>
                        <Collapse in={this.state.error}><Typography variant='subtitle1' className="errorMessage">{this.state.errorMessage}</Typography></Collapse>


                        <TextField className="loginInput" InputProps={{ disableUnderline: true }} variant="standard" onChange={this.handleUserChange} value={this.state.username} placeholder="Username" />
                        <TextField className="loginInput" InputProps={{ disableUnderline: true }} variant="standard" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password" />

                        <Button type="submit" size={'large'}>Log in</Button>

                    </form>
                </Paper>
            </Box >
        );
    }
}

export default LoginPage;