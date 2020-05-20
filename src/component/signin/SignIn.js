import React from 'react';
import { AuthenticationService } from '../../service/authentication';

import { Button, Row, Form, FormControl, Col, Container } from 'react-bootstrap';
import style from './SignIn.module.css';
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
            <Container class={style.signInnContainer}>
                <Row>
                    <Col/>
                    <Col xs={12} sm={8} md={6} lg={4} xl={3}>
                        <Form onSubmit={this.handleSubmit} className={style.signInForm}>
                            <FormControl type="text" placeholder="Username" className="mr-sm-2" 
                                onChange={(event) => this.setState({username: event.target.value})}
                            />
                            <FormControl type="password" placeholder="Password" className="mr-sm-2" 
                                onChange={(event) => this.setState({password: event.target.value})}
                            />
                            <Button variant="warning" type="submit">SignIn</Button>
                            <NavLink to="/">
                                <Button variant="outline-warning">Home Page</Button>
                            </NavLink>
                        </Form>
                        
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );    
    }

}

export default SignIn;