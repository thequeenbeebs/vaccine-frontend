import React from 'react';

class SecondAppointmentForm extends React.Component {
    render() {
        return (
            <div>
            This is my second appointment form
                <div>First Appt Time: {this.props.firstAppt.appointment_time}</div>
                <div>First Appt Location: {this.props.firstAppt.vaccination_center.name}</div>
            </div>
        )
    }
}

export default SecondAppointmentForm