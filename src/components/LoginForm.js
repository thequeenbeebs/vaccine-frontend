import React from 'react';

class LoginForm extends React.Component {
    state = {
        email: ""
    }

    handleChange = (e) => {
        this.setState({email: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Log In to Your Account</h2>
                <form onSubmit={(e) => this.props.handleLogin(e, this.state.email)}>
                    <label>Please enter your e-mail address:</label><br/>
                    <input type="text"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default LoginForm;