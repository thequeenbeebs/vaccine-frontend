import React from 'react';
import MapBox from './MapBox'
import LocationDetails from './LocationDetails'
import { format } from 'date-fns';


class AppointmentForm extends React.Component{
    state = {
        location: "",
        date: "",
        month: "",
        day: "",
        year: "",
        timeOptions: [],
        time: "",
        selectLocation: true
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
            selectLocation: false
        })
    }

    render() {
        return(
            <div>
                {this.state.selectLocation ? <MapBox locations={this.props.locations} chooseLocation={this.chooseLocation}/> : <LocationDetails location={this.state.location} handleFormSubmit={this.props.handleFormSubmit} openPortal={this.props.openPortal}/>}
            </div>
        )
    }
}

export default AppointmentForm;