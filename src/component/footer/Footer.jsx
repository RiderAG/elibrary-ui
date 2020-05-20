import React from 'react';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';

const Footer = () => {
    return(
    <div className="fixed-bottom">  
        <Navbar color="dark" dark>
            <Container>
                <NavbarBrand>eLibrary, 2020</NavbarBrand>
            </Container>
        </Navbar>
    </div>
    )
}

export default Footer;