import React from 'react';

class LoginForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = (e, name) => {
        this.setState({[name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Log In to Your Account</h2>
                <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
                    <label>E-mail Address:</label><br/>
                    <input type="text"
                        onChange={(e) => this.handleChange(e, "email")}></input><br/>
                    <label>Password:</label><br/>
                    <input type="password"
                        onChange={(e) => this.handleChange(e, "password")}></input><br/>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default LoginForm;