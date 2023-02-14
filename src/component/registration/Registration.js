import React from 'react';
import { Jumbotron, Form, FormGroup, FormControl, Button, Card, Col, Row, ButtonGroup } from 'react-bootstrap';
import API from '../../util/api';
import { history } from '../../util/history';
import coutryList from 'country-list';

const allCountries = coutryList.getNames();

class Registration extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            country: '',
            city: '',
            address: '',
            password: '',
            passwordConfirm: '',
            violations: [],
            validated: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setState({validated: true});
            return;
        } 
        
        const data = {
            username: this.state.username,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };

        API.post("users/registration", data)
        .then(res => {
            if (res.status === 201) {
                alert("Registration successful")
                history.push('/signin');
            }
        })
        .catch(error => {
            const status = error.response.status;
            if (status === 400) {
                this.setState({violations: error.response.data.violations});
            }
            console.log(error);
        })
        
    }

    handleCancel() {
        this.setState(null);
        history.push("/signin");
    }

    validatePasswordConfirm = (e) => {
        this.onChange(e);
        if (this.state.password !== e.target.value) {
            e.target.setCustomValidity("Passwords don't match")
        } else {
            e.target.setCustomValidity("");
        }
    }

    render() {
        var errorBlock = null;
        if (this.state.violations.length > 0) {
            errorBlock = 
                <Form.Group>
                    <Card bg="danger" text="light">
                        <Card.Body>
                            <Card.Title>Registration failed</Card.Title>
                            <Card.Text>
                                {this.state.violations.map(violation => <li key={violation}>{violation}</li>)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Form.Group>;
        }
        return(
            <Jumbotron>
                <Row>
                    <Col/>
                    <Col sm={12} md={11} lg={10} xl={9}>
                        <h1 className="text-center">Registration</h1>
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>Username*</Form.Label>
                                    <FormControl name="username" placeholder="Enter username" required
                                        pattern="[A-Za-z0-9_]{4,20}" onChange={this.onChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid username.
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <Form.Label>Email*</Form.Label>
                                    <FormControl name="email" type="email" placeholder="Enter email" required
                                        onChange={this.onChange}/>
                                </FormGroup>
                            </Form.Row>
                            <hr/>
                            <Form.Row>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>First Name*</Form.Label>
                                    <FormControl name="firstName" placeholder="Enter first name" required
                                        pattern="\S{2,50}" onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <Form.Label>Last Name*</Form.Label>
                                    <FormControl name="lastName" placeholder="Enter last name" required
                                        pattern="\S{2,50}" onChange={this.onChange}/>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>Birth Date*</Form.Label>
                                    <FormControl name="birthDate" type="date" required 
                                        onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>Gender*</Form.Label>
                                    <FormControl name="gender" as="select" defaultValue="" required
                                        onChange={this.onChange}>
                                        <option value="">Select gender...</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </FormControl>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} xs={12} sm={5} md={3}>
                                    <Form.Label>Country*</Form.Label>
                                    <FormControl name="country" as="select" defaultValue="" required
                                        onChange={this.onChange}>
                                        <option value="">Select country...</option>
                                        {allCountries.map(country =>
                                            <option key={country} value={country}>{country}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup as={Col} xs={12} sm={7} md={3}>
                                    <Form.Label>City</Form.Label>
                                    <FormControl name="city" placeholder="Enter city"
                                        onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup as={Col} sm={12} md={6}>
                                    <Form.Label>Address</Form.Label>
                                    <FormControl name="address" placeholder="Enter address"
                                        onChange={this.onChange}/>
                                </FormGroup>
                            </Form.Row>
                            <hr/>
                            <Form.Row>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>Password*</Form.Label>
                                    <FormControl name="password" type="password" placeholder="Enter password" required
                                        pattern="[A-Za-z0-9_]{8,20}" onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup as={Col} xs={12} sm={6}>
                                    <Form.Label>Password Confirm*</Form.Label>
                                    <FormControl name="passwordConfirm" type="password" placeholder="Confirm password"
                                        required pattern="[A-Za-z0-9_]{8,20}"  
                                        onChange={this.validatePasswordConfirm}/>
                                </FormGroup>
                            </Form.Row>
                            <Form.Group className="text-center">
                                <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                />
                            </Form.Group>
                            {errorBlock}
                            <FormGroup className="text-center">
                                <ButtonGroup>
                                    <Button variant="success" type="submit">Submit</Button>
                                    <Button variant="secondary" onClick={() => this.handleCancel()}>Cancel</Button>
                                </ButtonGroup>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col/>
                </Row>
            </Jumbotron>
        );
    }
}

export default Registration;