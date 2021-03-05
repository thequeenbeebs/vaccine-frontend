import React from 'react';
import MapBox from './MapBox'
import LocationDetails from './LocationDetails'
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';
import SecondAppointmentForm from './SecondAppointmentForm'

class AppointmentForm extends React.Component{
    state = {
        location: "",
        date: "",
        month: "",
        day: "",
        year: "",
        timeOptions: [],
        time: "",
        selectLocation: true,
        firstForm: false,
        secondForm: false,
        firstQuestion: true,
    }

    componentDidMount() {
        let times = 25
        let updatedTimeOptions = []
        let time = ""
        for (let i = 1; i < times; i++) {
            time = new Date(2021, 2, 25, i, 0)
            updatedTimeOptions = [...updatedTimeOptions, time]
        }
        this.setState({timeOptions: updatedTimeOptions})
    }

    chooseLocation = (location) => {
        this.setState({ 
            location: location,
            selectLocation: !this.state.selectLocation
        })
    }

    render() {
        return(
            <div>
                
                    
                    {this.state.firstQuestion 
                    ? <Dialog
                        open={true}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Which dose are you trying to schedule?"}</DialogTitle>
                        <DialogActions>
                        <Button onClick={() => this.setState({firstForm: true, firstQuestion:false})}>First Dose</Button>
                        <Button onClick={() => this.setState({secondForm: true, firstQuestion: false})}>Second Dose</Button>
                        </DialogActions>
                    </Dialog>
                    : null}
                
                {this.state.firstForm && this.state.selectLocation ? <MapBox locations={this.props.locations} chooseLocation={this.chooseLocation}/> : null}
                {this.state.firstForm && !this.state.selectLocation ? <LocationDetails location={this.state.location} handleFormSubmit={this.props.handleFormSubmit} openPortal={this.props.openPortal} chooseLocation={this.chooseLocation}/> : null}
                {this.state.secondForm ? <SecondAppointmentForm locations={this.props.locations} vaccines={this.props.vaccines} handleFormSubmit={this.props.handleFormSubmit} openPortal={this.props.openPortal}/> : null}
                
            </div>
        )
    }
}

export default AppointmentForm;