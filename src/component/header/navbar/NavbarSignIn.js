import React from 'react';
import { AuthenticationService } from '../../../service/AuthenticationService';
import { Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CartLogo from '../../../cartLogo.svg';

class NavbarSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: AuthenticationService.isAuthenticated()};
    }

    handleLogout = event => {
        event.preventDefault();
        AuthenticationService.logout();
        this.setState({
            isAuthenticated: AuthenticationService.isAuthenticated()
        });
    }

    render() {
        let items = [];

    items.push(<Nav.Link as={NavLink} to="/cart"><Image src={CartLogo} height="28px"/></Nav.Link>)

        if (this.state.isAuthenticated) {
            items.push(<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>);
            items.push(<Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>);
        } else {
            items.push(<Nav.Link as={NavLink} to="/signin">SignIn</Nav.Link>);
        }

        return (
            <Nav>
                {items}
            </Nav>
        );
    };
}

export default NavbarSignIn;