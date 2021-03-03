import React from 'react';
import AppointmentCard from './AppointmentCard';
import AppointmentForm from './AppointmentForm';
import CancellationModal from './CancellationModal'
import EditAppointmentForm from './EditAppointmentForm'
import SecondAppointmentForm from './SecondAppointmentForm'
import Button from '@material-ui/core/Button';

class MainContainer extends React.Component{
    state = {
        formOpen: false,
        portalOpen: true,
        modalOpen: false,
        editFormOpen: false,
        secondFormOpen: false, 
        selectedAppointment: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true,
            portalOpen: false
        })
    }

    openEditForm = () => {
        this.setState({
            editFormOpen: true,
            portalOpen: false
        })
    }

    openSecondForm = () => {
        this.setState({
            secondFormOpen: true,
            portalOpen: false
        })
    }

    openPortal = () => {
        this.setState({
            formOpen: false,
            portalOpen: true,
            editFormOpen: false
        })
    }

    toggleModal = () => {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    setSelectedAppointment = (appointment) => {
        this.setState({selectedAppointment: appointment})
    }

    render() {
        let patient = this.props.patient
        return(
            <div >
                <div className="welcome-header main-container">
                    <h2>Welcome, {patient.first_name}</h2>
                    <Button onClick={this.props.logOut}>Log Out</Button><br/>
                </div>
                {(patient.appointments.length > 0 ) && this.state.portalOpen ? patient.appointments.map(appointment => <AppointmentCard appointment={appointment} key={appointment.id} toggleModal={this.toggleModal} setSelectedAppointment={this.setSelectedAppointment} openEditForm={this.openEditForm}/>) : null}
                {(patient.appointments.length === 0) && this.state.portalOpen ? <Button onClick={this.openForm}>Schedule COVID-19 Vaccination</Button> : null }
                {(patient.appointments.length === 1) && this.state.portalOpen? <Button onClick={this.openSecondForm}>Schedule Second Vaccination Appointment</Button> : null}
                {this.state.formOpen ? <AppointmentForm locations={this.props.locations} handleFormSubmit={this.props.handleFormSubmit} openPortal={this.openPortal}/> : null}
                {this.state.modalOpen ? <CancellationModal toggleModal={this.toggleModal} cancelAppointment={this.props.cancelAppointment} appointment={this.state.selectedAppointment}/> : null}
                {this.state.editFormOpen ? <EditAppointmentForm locations={this.props.locations} selectedAppointment={this.state.selectedAppointment} handleEditFormSubmit={this.props.handleEditFormSubmit} openPortal={this.openPortal}/> : null}
                {this.state.secondFormOpen ? <SecondAppointmentForm firstAppt={this.props.patient.appointments[0]}/> : null}
            </div>
        )
    }
}

export default MainContainer;