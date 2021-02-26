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
        month: "",
        day: "",
        year: "",
        timeOptions: [],
        time: "",
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
        this.setState({ location: location})
    }

    chooseDate = (date) => {
        this.setState({
            date: date,
            month: parseInt(format(date, 'M')) - 1,
            day: parseInt(format(date, 'd')),
            year: parseInt(format(date, 'y'))
        })
    }

    chooseTime = (time) => {
        this.setState({time: new Date(time)})
    }

    render() {
        return(
            <div>
                <h3>Choose a Location:</h3>
                <MapBox locations={this.props.locations} chooseLocation={this.chooseLocation}/>
                <div className="date-container">
                    <h3>Choose a Date:</h3>
                    <p>Selected Location: {this.state.location ? this.state.location.properties.name : 'none'}</p>
                    <p>Selected date: {this.state.date ? format(this.state.date, 'MMMM dd, yyyy', { locale: enGB }) : 'none'}</p>
                    <p>Selected time: {this.state.time ? format(this.state.time, 'h:mmaaa') : 'none'}</p>
                    <form onSubmit={e => {
                        this.props.handleFormSubmit(e, this.state)
                        this.props.openPortal()
                        }}>
                        <select className='input' 
                            style={{ marginLeft: 16, width: 80 }}
                            onChange={(e) => this.chooseTime(e.target.value)}>
                            {this.state.timeOptions.map((time, index) => <option value={new Date(this.state.year, this.state.month, this.state.day, index)}>{(new Date(this.state.year, this.state.month, this.state.day, index)).toString()}</option>)}
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