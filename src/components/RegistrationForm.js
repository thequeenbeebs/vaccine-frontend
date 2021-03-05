import React from 'react';
import { Button, TextField } from '@material-ui/core';

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  class RegistrationForm extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        errors: {
            first_name: "First Name Required",
            last_name: "Last Name Required",
            email: "E-Mail Address Required",
            phone_number: "Phone Number Required",
            password: "Password Required",
        }
    }

    

    handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        let errors = this.state.errors

        switch (name) {
            case 'first_name':
                errors.first_name = 
                    value.length < 1 ? 'First Name Required' : '';
            break;
            case 'last_name':
                errors.last_name =
                    value.length < 1 ? 'Last Name Required' : '';
            break;
            case 'email':
                errors.email =
                    (value.length > 0 && validateEmail(value)) ? '' : 'E-mail Address Not Valid'
            break;
            case 'phone_number':
                errors.phone_number =
                    value.length < 1 ? 'Phone Number Required' : '';
            break;
            case 'password':
                errors.password = 
                    value.length < 1 ? 'Password Required' : ""; 
            break;
            default:
            break;
        }

        this.setState({errors, [name]: value})
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(validateForm(this.state.errors)) {
            let newPatient = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phone_number,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
            this.props.handleRegistration(newPatient)
        } 
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <h2>Register for COVID-19 Vaccine</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    <TextField type="text" 
                        label="First Name"
                        name="first_name"
                        onChange={(e) => this.handleChange(e)} noValidate></TextField><br/>
                    {errors.first_name.length > 0 && <span className='error'>{errors.first_name}</span>}<br/>
                    <TextField 
                        type="text" 
                        label="Last Name"
                        name="last_name"
                        onChange={(e) => this.handleChange(e)} noValidate></TextField><br/>
                    {errors.last_name.length > 0 && <span className='error'>{errors.last_name}</span>}<br/>
                    <TextField type="text" 
                        name="phone_number"
                        label="Phone Number"
                        onChange={(e) => this.handleChange(e)} noValidate></TextField><br/>
                    {errors.phone_number.length > 0 && <span className='error'>{errors.phone_number}</span>}<br/>
                    <TextField type="text" 
                        name="email"
                        label="Email Address"
                        onChange={(e) => this.handleChange(e)} noValidate></TextField><br/>
                    {errors.email.length > 0 && <span className='error'>{errors.email}</span>}<br/>
                    <TextField type="password" 
                        name="password"
                        label="Password"
                        onChange={(e) => this.handleChange(e)} noValidate></TextField><br/>
                    {errors.password.length > 0 && <span className='error'>{errors.password}</span>}<br/>
                    <Button type="submit"
                        variant="outlined">Submit</Button>
                </form>
            </div>
        )
    }
}

export default RegistrationForm;