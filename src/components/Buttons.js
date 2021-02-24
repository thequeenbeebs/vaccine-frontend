import React from 'react';

const Buttons = (props) => {
    return (
        <div>
            <h2>Welcome to the Harris County Vaccine Hub</h2>
            <button onClick={() => props.handleClick('register')}>
                Register for COVID Vaccine
            </button>
            <button onClick={() => props.handleClick('login')}>
                View My Appointments
            </button>
        </div>
    )
}

export default Buttons;