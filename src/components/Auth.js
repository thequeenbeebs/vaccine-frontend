import React from 'react';
import Buttons from './Buttons';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

class Auth extends React.Component {
    state = {
        status: "buttons"
    }

    handleClick = (message) => {
        this.setState({ status: message})
    }

    render() {
        return (
            <div>
                {this.state.status === "buttons" ? <Buttons handleClick={this.handleClick}/> : null}
                {this.state.status === "register" ? <RegistrationForm /> : null}
                {this.state.status === "login" ? <LoginForm handleLogin={this.props.handleLogin}/> : null}
            </div>
        )
    }
}

export default Auth;