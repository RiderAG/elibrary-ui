import React from 'react';
import { AuthenticationService } from '../../../service/authentication';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavbarSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: AuthenticationService.isAuthenticated()};
    }

    handleLogout = event => {
        event.preventDefault();
        AuthenticationService.logout();
        this.setState({
            username: '',
            password: '',
            isAuthenticated: AuthenticationService.isAuthenticated()
        });
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Nav>
                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                    <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                </Nav>
            );
        }
        return (
            <Nav>
                <Nav.Link as={NavLink} to="/signin">SignIn</Nav.Link>
            </Nav>
        );
    };
}

export default NavbarSignIn;