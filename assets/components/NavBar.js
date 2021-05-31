import React, {Component} from 'react';
import { StylesProvider } from "@material-ui/core/styles";
import {
    Drawer,
    AppBar,
    Toolbar,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Hidden
  } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { useState } from "react";
import { Menu } from "@material-ui/icons";
import {Link} from "react-router-dom";

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

function SideDrawer(){
    const [state, setState] = useState({ right: false });

    const toggleDrawer = (anchor, open) => event => {
    if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
  
      setState({ [anchor]: open });
    };
  
    const sideDrawerList = anchor => (
        <div
            className="list"
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav" className="nav-menu-drawer">
                {MenuItems.map((item, index) => {
                    return(
                        <a href={item.url} key={item.title} className={item.cName + "-drawer"}>
                            <ListItem button>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </a>
                    )
                })}
            </List>
        </div>
    );
  
    return (
            <React.Fragment>
                <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer("right", true)}
                >
                    <Menu fontSize="large" style={{ color: `white` }} />
                </IconButton>
        
                <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
                >
                    {sideDrawerList("right")}
                </Drawer>
            </React.Fragment>
    );
}

export default function NavBar(){
    return(
        <StylesProvider injectFirst>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth="md" className="navbar">
                        <IconButton component={Link} to="/" edge="start">
                            <Visibility fontSize="large" className="logo"/>
                        </IconButton>
                        <Hidden smDown>
                            <List component="nav" className="nav-menu">
                                {MenuItems.map((item, index) => {
                                    return(
                                        <a href={item.url} key={item.title} className={item.cName}>
                                            <ListItem button>
                                                <ListItemText primary={item.title} />
                                            </ListItem>
                                        </a>
                                    )
                                })}
                            </List>
                        </Hidden>
                        <Hidden mdUp>
                            <SideDrawer/>
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </StylesProvider>
    );
}