import React, { Component } from 'react';
import { setTimedError } from '../../services/timed/setTimedError';
import { setTimedInfo } from '../../services/timed/setTimedInfo';
import { Box, Paper, Button, TextField, Typography, Collapse } from '@material-ui/core';

class RegistrationPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            errorMessage: '',
            error: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTimedInfo = setTimedInfo.bind(this);
        this.setTimedError = setTimedError.bind(this);
    }

    handleInputChange(e) {
        //Basic checking, should the form change
        if (e.target.name === 'password' || e.target.name === 'username' || e.target.name === 'passwordConfirm') {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleSubmit() {
        //TODO

    }

    render() {
        return (
            <Box className="registrationPage">
                <Paper className="registrationForm" elevation={2}>
                    <Paper className="welcomeBox">
                        <Typography variant='h3' gutterBottom>Join our community!</Typography>
                    </Paper>

                    <Box className="formBox">
                        <form onSubmit={this.handleSubmit}>
                            <Collapse in={this.state.error}><Typography variant='subtitle1' className="errorMessage">{this.state.errorMessage}</Typography></Collapse>

                            <TextField className="registrationInput" name="username" InputProps={{ disableUnderline: true }} variant="standard" onChange={this.handleInputChange} value={this.state.username} placeholder="Username" />
                            <TextField className="registrationInput" name="password" type="password" InputProps={{ disableUnderline: true }} variant="standard" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" />
                            <TextField className="registrationInput" name="passwordConfirm" type="password" InputProps={{ disableUnderline: true }} variant="standard" onChange={this.handleInputChange} value={this.state.passwordConfirm} placeholder="Confirm password" />

                            <Button variant='contained' type="submit" size={'large'}>Register</Button>
                            <Typography className="loginReminder" variant="subtitle2">Already a member? <a href="/login">Log in</a></Typography>
                        </form>
                    </Box>
                </Paper>
            </Box>
        );
    }
}

export default RegistrationPage;