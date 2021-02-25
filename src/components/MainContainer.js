import React from 'react';
import AppointmentCard from './AppointmentCard';
import AppointmentForm from './AppointmentForm';

class MainContainer extends React.Component{
    state = {
        formOpen: false,
        portalOpen: true
    }

    openForm = () => {
        this.setState({
            formOpen: true,
            portalOpen: false
        })
    }

    render() {
        let patient = this.props.patient
        return(
            <div>
                <h2>Welcome, {patient.first_name}</h2>
                <button onClick={this.props.logOut}>Log Out</button><br/>
                {(patient.appointments.length > 0 ) && this.state.portalOpen ? patient.appointments.map(appointment => <AppointmentCard appointment={appointment}/>) : null}
                {(patient.appointments.length === 0) && this.state.portalOpen ? <button onClick={this.openForm}>Schedule COVID-19 Vaccination</button> : null }
                {this.state.formOpen ? <AppointmentForm locations={this.props.locations}/> : null}
            </div>
        )
    }
}

export default MainContainer;