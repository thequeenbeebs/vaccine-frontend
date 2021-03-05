import React from 'react';
// import { DatePicker } from 'react-nice-dates'
import { enGB } from 'date-fns/locale'
import { format, add, getDay } from 'date-fns';
import { FormControl, MenuItem, Select, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

class SecondAppointmentForm extends React.Component {
    state = {
        date: null,
        locationID: "",
        location: "",
        vaxID: "",
        vaccine: "",
        secondDate: null,
        time: "",
        month: "",
        day: "",
        year: ""
    }

    chooseLocation = (id) => {
        let loc= this.props.locations.features.find(location => location.properties.id === parseInt(id))
        this.setState({
            locationID: id,
            location: loc
        })
    }

    chooseDate = (date) => {
        this.setState({date: date})
    }

    chooseSecondDate = (date) => {
        this.setState({
            secondDate: date,
            month: parseInt(format(date, 'M')) - 1,
            day: parseInt(format(date, 'd')),
            year: parseInt(format(date, 'y'))
        })
    }

    chooseSecondTime = (time) => {
        this.setState({time: new Date(time)})
    }

    chooseVaccine = (id) => {
        let vax = this.props.vaccines.find(vaccine => vaccine.id === parseInt(id))
        let recommendedDate = add(new Date(this.state.date), {weeks: vax.weeks_between_doses})
        this.setState({
            vaxID: id,
            vaccine: vax,
            secondDate: recommendedDate,
            month: parseInt(format(recommendedDate, 'M')) - 1,
            day: parseInt(format(recommendedDate, 'd')),
            year: parseInt(format(recommendedDate, 'y'))
        })
    }

    disabledDates = (date) => {
        let location = this.state.location
        let daysClosed = location.properties.daysClosed.map(day => parseInt(day))
        return daysClosed.includes(getDay(date))
    }

    render() {

        let arrayOfTimes = []
        if (this.state.location) {
            let i = this.state.location.properties.openingHour
            while (i < this.state.location.properties.closingHour) {
            arrayOfTimes.push(i)
            i++
            }
        }
        
        return (
            <div className="main-container">
                <form onSubmit={e => {
                    this.props.handleFormSubmit(e, this.state)
                    this.props.openPortal()
                }}>
                    <FormControl>
                        <Select className="input submit-btn"
                            value={this.state.locationID}
                            label="First Location"
                            onChange={(e) => this.chooseLocation(e.target.value)}
                            displayEmpty>
                            <MenuItem value="" disabled>Location of First Dose</MenuItem>
                            {this.props.locations.features.map(location => <MenuItem value={location.properties.id}>{location.properties.name}</MenuItem>)}
                        </Select>
                    </FormControl><br/>
                    {this.state.location ? <div className="submit-btn"><MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={this.state.date} 
                            onChange={this.chooseDate}
                            shouldDisableDate={this.disabledDates}
                            emptyLabel="Date of First Dose" 
                            /><br/>
                    </MuiPickersUtilsProvider></div> : null}
                    {this.state.date ? <FormControl>
                        <Select className="input submit-btn"
                            value={this.state.vaxID}
                            label="Vaccine Administered"
                            onChange={e => this.chooseVaccine(e.target.value)}
                            displayEmpty>
                            <MenuItem value="" disabled>Vaccine Administered</MenuItem>
                            {this.props.vaccines.map(vax => <MenuItem value={vax.id}>{vax.name}</MenuItem>)}
                        </Select>
                    </FormControl> : null}

                    {this.state.vaccine 
                    ? <><div className="submit-btn">{this.state.vaccine.name} recommends {this.state.vaccine.weeks_between_doses} weeks between doses.</div>
                    <div className="submit-btn"><MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={this.state.secondDate} 
                            onChange={this.chooseSecondDate}
                            shouldDisableDate={this.disabledDates}
                            emptyLabel="Date of Second Dose" 
                            /><br/>
                    </MuiPickersUtilsProvider></div>
                    </>
                    : null}
                        {this.state.secondDate ? <div>
                            <FormControl>
                                <Select className='input submit-btn' 
                                    value={this.state.time}
                                    label="Appointment Times"
                                    onChange={(e) => this.chooseSecondTime(e.target.value)}
                                    displayEmpty>
                                    <MenuItem value="" disabled>Available Times</MenuItem>
                                    {arrayOfTimes.map((time) => <MenuItem value={new Date(this.state.year, this.state.month, this.state.day, time).toString()}>{format(new Date(this.state.year, this.state.month, this.state.day, time), 'h:mmaaa')}</MenuItem>)}
                                </Select> 
                            </FormControl><br/>
                            <div className="submit-btn"><Button variant="outlined" type="submit">Submit</Button></div>
                            </div> : null}
                </form>
            </div>
        )
    }
}

export default SecondAppointmentForm