import React from 'react';
import Button from '@material-ui/core/Button';

const Buttons = (props) => {
    return (
        <div>
            <h2>Welcome to the Harris County Vaccine Hub</h2>
            <Button onClick={() => props.handleClick('register')}>
                Register for COVID-19 Vaccine
            </Button>
            <Button onClick={() => props.handleClick('login')}>
                View My Appointments
            </Button>
        </div>
    )
}

export default Buttons;