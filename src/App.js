import './App.css';
import React from 'react';
import Auth from './components/Auth'
import MainContainer from "./components/MainContainer"
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'

class App extends React.Component {
  state = {
    currentPatient: null,
    locations: []
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
          let patientData = JSON.parse(data.patient_data)
          if (patientData.error_message) {
            alert(patientData.error_message) 
          } else {
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
        let patientData = JSON.parse(data.patient_data)
        if (patientData.error_message) {
          alert(patientData.error_message) 
        } else {
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
      patient_id: this.state.currentPatient.id,
      vaccination_center_id: inputs.location.properties.id,
      vaccine_id: 5,//hard coded to Moderna - need to fix later
      appointment_time: inputs.time
    }

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
      patient_id: this.state.currentPatient.id,
      vaccination_center_id: data.location.properties.id,
      vaccine_id: 5, //this one is hard coded too
      appointment_time: data.time
    }

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
        <AppBar color="primary">
          <h1>HARRIS COUNTY VACCINE HUB</h1>
        </AppBar>
        <Container>
          {this.state.currentPatient 
            ? <MainContainer patient={this.state.currentPatient} 
              logOut={this.logOut} 
              locations={this.state.locations} 
              handleFormSubmit={this.handleFormSubmit}
              cancelAppointment={this.cancelAppointment} 
              handleEditFormSubmit={this.handleEditFormSubmit} 
              /> 
            : <Auth handleLogin={this.handleLogin} handleRegistration={this.handleRegistration}/>}
        </Container>
    </div> 
    )
  }
}



export default App;
