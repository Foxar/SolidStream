
import React, {Component} from 'react';
import { Button } from './Button';
import { MenuItems } from './MenuItems';
import './NavBar.css';

class NavBar extends Component {

    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavBarItems">
                <h1 className="navbar-logo">
                    <a href="/" className="logo"><i className="fas fa-eye"></i></a>
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
                    <Button>Login</Button>
            </nav>
        )
    }    
//    return (
//        <div className="navbar">
//            <div>{/*<Link to="/">Home</Link>*/}
//                <a href="/">Home</a>
//            </div>
//            <div>{/*<Link to="/player">Player</Link>*/}
//                <a href="/player">Player</a>
//            </div>
//            <div>{/*<Link to="/test">Test</Link>*/}
//                <a href="/test">Test</a>
//            </div>
//            <div><Link to="/login">Login</Link></div>
//        </div>
//    );
}

export default NavBar