import React, {Component} from 'react';
import Cookies from 'js-cookie';


const MenuItems = [
    {
        title: 'Home',
        url: '/',
        cName: 'nav-links'
    },
    {
        title: 'Test',
        url: '/test',
        cName: 'nav-links'
    },
    {
        title: 'Player',
        url: '/player',
        cName: 'nav-links'
    },
    {
        title: 'Streaming',
        url: '/streamingpanel',
        cName: 'nav-links'
    },
    {
        title: 'Login',
        url: '/login',
        cName: 'nav-links-login'
    }
]

class NavBar extends Component {

    constructor(){
        super();
        this.state = {
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({clicked: !this.state.clicked})
    }

    

    render(){
        return(
            <div className="NavBarItems">
                <h1 className="navbar-logo">
                    <a href="/" className="logo"><i className="fas fa-eye eye-logo"></i></a>
                </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <div className="profile">
                    <p>Logged in as:</p>
                    <p className="loggedInAs">{Cookies.get('username')}</p>
                </div>
            </div>
        )
    }    
}

export default NavBar

