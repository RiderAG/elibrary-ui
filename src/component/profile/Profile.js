import React from 'react';
import api from '../../util/api';
import { AuthenticationService} from '../../service/authentication';
import { Spinner, Row, Col, Media, Image } from 'react-bootstrap';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            role: '',
            isLoading: true
        }
    }

    componentDidMount() {
        const token = AuthenticationService.currentUserJwt;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        api.get('users/profile', config)
        .then(res => {
            if (res.status === 200) {
                const user = res.data;
                this.setState({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    isLoading: false
                });
            }
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Spinner animation="border" variant="warning" />
        }
        return(
            <Media>
                <Row>
                    <Col xs={12} sm={6}>
                        <Image 
                            width="100%"
                            src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt="Generic placeholder"
                        />
                    </Col>
                    <Col>
                        <Media.Body>
                            <h3>{this.state.username}</h3>
                            <p><b>First Name:</b> {this.state.firstName}</p>
                            <p><b>Last Name:</b> {this.state.lastName}</p>
                            <p><b>Email:</b> {this.state.email}</p>
                            <p><b>UserID:</b> {this.state.id}</p>
                            <p><b>Role:</b> {this.state.role}</p>
                        </Media.Body>
                    </Col>
                </Row>  
            </Media>
        );
    }
}

export default Profile;