import React from 'react';
import MapBox from './MapBox'
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

class AppointmentForm extends React.Component{
    state = {
        location: "",
        date: "",
        timeOptions: [],
        time: ""
    }

    componentDidMount() {
        let times = 25
        let updatedTimeOptions = []
        let time = ""
        for (let i = 1; i < times; i++) {
            if (i < 10) {
                time = `0${i}:00:00`
            } else {
                time = `${i}:00:00`
            }
            updatedTimeOptions.push(time)
        }
        this.setState({timeOptions: updatedTimeOptions})
    }

    chooseLocation = (location) => {
        this.setState({ location: location})
    }

    chooseDate = (date) => {
        this.setState({date: date})
    }

    chooseTime = (time) => {
        this.setState({time: time})
    }

    render() {
        return(
            <div>
                <h3>Choose a Location:</h3>
                <MapBox locations={this.props.locations} chooseLocation={this.chooseLocation}/>
                <div id="date-container">
                    <h3>Choose a Date:</h3>
                    <p>
                        Selected date: {this.state.date ? format(this.state.date, 'dd MMM yyyy', { locale: enGB }) : 'none'}
                    </p>
                    <form onSubmit={e => {
                        this.props.handleFormSubmit(e, this.state)
                        this.props.openPortal()
                        }}>
                        <select className='input' 
                            style={{ marginLeft: 16, width: 80 }}
                            onChange={(e) => this.chooseTime(e.target.value)}>
                            {this.state.timeOptions.map(time => <option value={time}>{time}</option>)}
                        </select>
                        <input className='input' 
                            style={{ marginLeft: 16, width: 80 }}
                            type='submit'></input>
                    </form>
                    <DatePickerCalendar date={this.state.date} onDateChange={this.chooseDate} locale={enGB} />
                </div> 
            </div>
        )
    }
}

export default AppointmentForm;