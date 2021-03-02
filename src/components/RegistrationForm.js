import React from 'react';

class RegistrationForm extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: ""
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    render() {
        return (
            <div>
                <h2>Register for COVID-19 Vaccine</h2>
                <form onSubmit={(e) => this.props.handleRegistration(e, this.state)}>
                    <label>First Name:</label><br/>
                    <input type="text" name="first_name"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <label>Last Name:</label><br/>
                    <input type="text" name="last_name"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <label>Phone Number:</label><br/>
                    <input type="text" name="phone_number"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <label>E-mail Address:</label><br/>
                    <input type="text" name="email"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <label>Password:</label><br/>
                    <input type="password" name="password"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <label>Confirm Password:</label><br/>
                    <input type="password" name="password_confirmation"
                        onChange={(e) => this.handleChange(e)}></input><br/>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default RegistrationForm;