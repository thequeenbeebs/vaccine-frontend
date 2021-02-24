import './App.css';
import React from 'react';
import Auth from './components/Auth'
import MainContainer from "./components/MainContainer"

class App extends React.Component {
  state = {
    currentPatient: "",
    patients: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/patients')
    .then(resp => resp.json())
    .then(patientData => this.setState({patients: patientData}))
  }

  handleLogin = (event, email) => {
    event.preventDefault()
    let login = this.state.patients.find(patient => patient.email === email)
    this.setState({currentPatient: login})
  }

  render() {
    return (
      <div>
        <h1>HARRIS COUNTY VACCINE HUB</h1>
        {this.state.currentPatient ? <MainContainer /> : <Auth handleLogin={this.handleLogin}/>}
    </div> 
    )
  }
}



export default App;
