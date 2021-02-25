import './App.css';
import React from 'react';
import Auth from './components/Auth'
import MainContainer from "./components/MainContainer"

class App extends React.Component {
  state = {
    currentPatient: "",
    patients: [],
    locations: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/patients')
    .then(resp => resp.json())
    .then(patientData => this.setState({patients: patientData}))

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
            "daysOpen": location.days_open,
            "openingHour": location.opening_hour,
            "closingHour": location.closing_hour,
            "appointmentsPerHour": location.appointments_per_hour
          }
        }})
      }
      this.setState({ locations: parsedLocations })
    })
  }

  handleLogin = (event, email) => {
    event.preventDefault()
    let login = this.state.patients.find(patient => patient.email === email)
    this.setState({currentPatient: login})
  }

  handleRegistration = (event, newPatient) => {
    event.preventDefault()
    
    let reqPack = {}
        reqPack.body = JSON.stringify(newPatient)
        reqPack.method = "POST"
        reqPack.headers = {"Content-Type": "application/json"}
    
    fetch('http://localhost:3000/patients', reqPack)
      .then(resp => resp.json())
      .then(newPatient => this.setState({ currentPatient: newPatient}))
  }

  logOut = () => {
    this.setState({ currentPatient: ""})
  }

  render() {
    return (
      <div>
        <h1>HARRIS COUNTY VACCINE HUB</h1>
        {this.state.currentPatient 
          ? <MainContainer patient={this.state.currentPatient} logOut={this.logOut} locations={this.state.locations}/> 
          : <Auth handleLogin={this.handleLogin} handleRegistration={this.handleRegistration}/>}
    </div> 
    )
  }
}



export default App;
