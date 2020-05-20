import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import logo from './../../../logo.svg';
import NavbarSignIn from './NavbarSignIn';

const NavigationBar = () => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg" className="align-items-center">
            <Navbar.Brand><Image src={logo} height="30px"/>eLibrary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/features">Features</Nav.Link>
                    <Nav.Link as={NavLink} to="/pricing">Pricing</Nav.Link>
                </Nav>
                <NavbarSignIn />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;