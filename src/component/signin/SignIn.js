import React from 'react';
import { AuthenticationService } from '../../service/authentication';

import { Button, Row, Form, FormControl, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        AuthenticationService.login(this.state.username, this.state.password);
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col/>
                    <Col md={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormControl type="text" placeholder="Username" className="mr-sm-2" 
                                onChange={(event) => this.setState({username: event.target.value})}
                            />
                            <FormControl type="password" placeholder="Password" className="mr-sm-2" 
                                onChange={(event) => this.setState({password: event.target.value})}
                            />
                            <Button variant="warning" type="submit">SignIn</Button>
                        </Form>
                        <NavLink to="/">Home Page</NavLink>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );    
    }

}

export default SignIn;