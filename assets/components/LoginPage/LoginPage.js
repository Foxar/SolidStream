import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { handleLogin } from '../../services/handleLogin';



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
        this.handleLogin = handleLogin.bind(this);
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
        console.log(this);
        this.handleLogin();
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