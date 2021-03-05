import React from 'react';
import { TextField, Button } from '@material-ui/core';

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
                    <TextField
                        onChange={(e) => this.handleChange(e, "email")}
                        label="Email Address"
                        ></TextField><br/>
                    <TextField 
                        type="password"
                        label="Password"
                        onChange={(e) => this.handleChange(e, "password")}></TextField><br/>
                    <div className="submit-btn"><Button variant="outlined" 
                        type="submit"
                        >Submit</Button></div>
                </form>
            </div>
        )
    }
}

export default LoginForm;