import React from 'react';
import api from '../../util/api';
import { AuthenticationService} from '../../service/AuthenticationService';
import { Spinner, Row, Col, Media, Image, Button } from 'react-bootstrap';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            country: '',
            city: '',
            address: '',
            role: '',
            isLoading: true
        }
    }

    componentDidMount() {
        api.get('users/profile')
        .then(res => {
            if (res.status === 200) {
                const user = res.data;
                this.setState({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    gender: user.gender,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    role: user.role,
                    isLoading: false
                });
            }
        })
        .catch(error => {
            console.log("Error: ", error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return(
                <div>
                    <Spinner animation="border" variant="warning" />
                    <Button variant="outline-danger" onClick={AuthenticationService.refreshToken}>Refresh Token</Button>
                </div>
            );
        }
        return(
            <Media>
                <Row>
                    <Col xs={12} sm={6}>
                        <Image 
                            width="100%"
                            src={process.env.PUBLIC_URL + '/avatarMock.png'}
                            alt="Generic placeholder"
                        />
                    </Col>
                    <Col>
                        <Media.Body>
                            <h3>{this.state.username}</h3>
                            <p><b>UserID:</b> {this.state.id}</p>
                            <p><b>First Name:</b> {this.state.firstName}</p>
                            <p><b>Last Name:</b> {this.state.lastName}</p>
                            <p><b>Email:</b> {this.state.email}</p>
                            <p><b>Birth Date:</b> {this.state.birthDate}</p>
                            <p><b>Gender:</b> {this.state.gender}</p>
                            <p><b>Country:</b> {this.state.country}</p>
                            <p><b>City:</b> {this.state.city}</p>
                            <p><b>Address:</b> {this.state.address}</p>
                            <p><b>Role:</b> {this.state.role}</p>
                            <p><b></b></p>
                        </Media.Body>
                    </Col>
                </Row>  
            </Media>
        );
    }
}

export default Profile;