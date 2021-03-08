import './App.css';
import React from 'react';
import Auth from './components/Auth'
import MainContainer from "./components/MainContainer"
import { AppBar, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    currentPatient: null,
    locations: [],
    vaccines: [],
    errors: ''
  }

  componentDidMount() {
    if(localStorage.getItem("token")) {
      fetch('http://localhost:3000/decode_token', {
        headers: {
          "Authenticate": localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(patientData => this.setState({currentPatient: patientData}))
    }

    fetch('http://localhost:3000/vaccines')
      .then(resp => resp.json())
      .then(vaxData => this.setState({vaccines: vaxData}))

    fetch('http://localhost:3000/vaccination_centers')
    .then(resp => resp.json())
    .then(locationData => {
      const parsedLocations = {
        "type": "FeatureCollection",
        "features": locationData.map(location => {
          return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": location.coordinates
          },
          "properties": {
            "name": location.name,
            "phoneFormatted": location.phone_number,
            "address": location.address,
            "city": location.city,
            "state": location.state,
            "postalCode": location.zip_code,
            "id": location.id,
            "daysClosed": location.days_closed,
            "openingHour": location.opening_hour,
            "closingHour": location.closing_hour,
            "appointmentsPerHour": location.appointments_per_hour
          }
        }})
      }
      this.setState({ locations: parsedLocations })
    })
  }

  handleClose = () => {
    this.setState({errors: null})
  }

  handleLogin = (event, state) => {
    event.preventDefault()

    let reqPack = {}
        reqPack.method = "POST"
        reqPack.headers = {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
        reqPack.body = JSON.stringify({
          email: state.email,
          password: state.password
        })

    fetch('http://localhost:3000/login', reqPack)
        .then(resp => resp.json())
        .then(data => {
          if (data.error_message) {
            this.setState({errors: data.error_message})
          } else {
            let patientData = JSON.parse(data.patient_data)
            localStorage.setItem("token", data.token)
            this.setState({currentPatient: patientData})
          }
        })
        
  }

  

  handleRegistration = (newPatient) => {
    let reqPack = {}
        reqPack.body = JSON.stringify({patient: newPatient})
        reqPack.method = "POST"
        reqPack.headers = {"Content-Type": "application/json"}
    
    fetch('http://localhost:3000/patients', reqPack)
      .then(resp => resp.json())
      .then(data => { 
        if (data.error_message) {
          this.setState({errors: data.error_message}) 
        } else {
          let patientData = JSON.parse(data.patient_data)
          localStorage.setItem("token", data.token)
          this.setState({currentPatient: patientData})
        }
        })
  }

  logOut = () => {
    localStorage.removeItem("token")
    this.setState({ currentPatient: null})
  }

  handleFormSubmit = (event, inputs) => {
    event.preventDefault()
    
    let newAppointment = {
      appointment: {
        patient_id: this.state.currentPatient.id,
        vaccination_center_id: inputs.location.properties.id,
        // vaccine_id: 11,//hard coded to Moderna - need to fix later
        appointment_time: new Date(inputs.time)
    }}

    let reqPack = {}
        reqPack.body = JSON.stringify(newAppointment)
        reqPack.method = "POST"
        reqPack.headers = {"Content-Type": "application/json"}
    
    fetch('http://localhost:3000/appointments', reqPack)
      .then(resp => resp.json())
      .then(appointmentData => this.setState({
        currentPatient: {
          ...this.state.currentPatient, 
          appointments: [...this.state.currentPatient.appointments, appointmentData]}
      }))
  }

  cancelAppointment = (appointment) => {
    fetch(`http://localhost:3000/appointments/${appointment.id}`, {method: 'DELETE'})

    this.setState({
      currentPatient: {
        ...this.state.currentPatient,
        appointments: this.state.currentPatient.appointments.filter(appt => appt.id !== appointment.id)
      }
    })
  }

  handleEditFormSubmit = (e, data) => {
    e.preventDefault()
    let editedAppt = {
      appointment: {
        patient_id: this.state.currentPatient.id,
        vaccination_center_id: data.location.properties.id,
        // vaccine_id: 11, //this one is hard coded too
        appointment_time: data.time
    }}

    let reqPack = {}
        reqPack.body = JSON.stringify(editedAppt)
        reqPack.method = "PATCH"
        reqPack.headers = {"Content-Type": "application/json"}

    fetch(`http://localhost:3000/appointments/${data.selectedAppointment.id}`, reqPack)
      .then(resp => resp.json())
      .then(appointmentData => this.setState({
        currentPatient: {
          ...this.state.currentPatient,
          appointments: this.state.currentPatient.appointments.map(appt => appt.id === appointmentData.id ? appointmentData : appt)
        }
      }))
  }

  render() {
    return (
      <div>
        <AppBar color="primary" className="header">
          HARRIS COUNTY VACCINE HUB
        </AppBar>
        {this.state.errors ? <Snackbar open={true} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert variant="filled" severity="error">{this.state.errors}</Alert>
        </Snackbar> : null}
          {this.state.currentPatient 
            ? <MainContainer patient={this.state.currentPatient} 
              logOut={this.logOut} 
              locations={this.state.locations}
              vaccines={this.state.vaccines} 
              handleFormSubmit={this.handleFormSubmit}
              cancelAppointment={this.cancelAppointment} 
              handleEditFormSubmit={this.handleEditFormSubmit} 
              /> 
            : <Auth handleLogin={this.handleLogin} handleRegistration={this.handleRegistration}/>}
    </div> 
    )
  }
}



export default App;
