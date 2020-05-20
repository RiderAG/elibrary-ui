import React from 'react';
import api from '../../util/api';
import { AuthenticationService} from '../../service/authentication';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            role: ''
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
                    role: user.role
                });
            }
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }

    render() {
        return(
            <div>
                <h3>Profile</h3>
                <p>{this.state.id}</p>
                <p>{this.state.username}</p>
                <p>{this.state.email}</p>
                <p>{this.state.role}</p>
            </div>
        );
    }
}

export default Profile;