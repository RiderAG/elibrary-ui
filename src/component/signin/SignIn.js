import React from 'react';
import { AuthenticationService } from '../../service/authentication';

import { Button, Form, FormControl, Jumbotron, Container, ButtonGroup, Row, Col } from 'react-bootstrap';
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
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col/>
                        <Col xs={12} sm={9} md={7} lg={5} xl={4}>
                            <Form onSubmit={this.handleSubmit} className="text-center">
                                <h1 className="text-center">eLibrary</h1>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Label>Username</Form.Label>
                                    <FormControl type="text" placeholder="Username" className="mr-sm-2" 
                                        onChange={(event) => this.setState({username: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <FormControl type="password" placeholder="Password" className="mr-sm-2" 
                                    onChange={(event) => this.setState({password: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <ButtonGroup>
                                        <Button variant="warning" type="submit">SignIn</Button>
                                        <Button as={NavLink} to="/registration" variant="outline-primary">Registration</Button>
                                    </ButtonGroup>                                
                                </Form.Group>
                                <Form.Group>
                                    <Button as={NavLink} to="/" variant="secondary">Continue as Guest</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </Jumbotron>
        );    
    }

}

export default SignIn;