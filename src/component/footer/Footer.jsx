import React from 'react';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';

const Footer = () => {
    return(
    <div className="fixed-bottom">  
        <Navbar variant="light">
            <Container>
                <NavbarBrand>eLibrary, 2020</NavbarBrand>
            </Container>
        </Navbar>
    </div>
    )
}

export default Footer;