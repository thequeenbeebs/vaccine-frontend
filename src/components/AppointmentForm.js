import React from 'react';
import MapBox from './MapBox'
import DatePicker from './DatePicker'

class AppointmentForm extends React.Component{
    state = {
        location: "",
        date: "",
        time: ""
    }

    chooseLocation = (location) => {
        this.setState({ location: location})
    }

    render() {
        return(
            <div>
                <h3>Choose a Location:</h3>
                <MapBox locations={this.props.locations} chooseLocation={this.chooseLocation}/>
                <h3>Choose a Date:</h3>
                <DatePicker />
            </div>
        )
    }
}

export default AppointmentForm;