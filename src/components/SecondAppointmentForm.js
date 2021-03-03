import React from 'react';
import { DatePicker } from 'react-nice-dates'
import { enGB } from 'date-fns/locale'
import { format, add } from 'date-fns';

class SecondAppointmentForm extends React.Component {
    state = {
        date: "",
        location: "",
        vaccine: "",
        secondDate: "",
        time: "",
        month: "",
        day: "",
        year: ""
    }

    chooseLocation = (id) => {
        let loc= this.props.locations.features.find(location => location.properties.id === parseInt(id))
        this.setState({location: loc})
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
            vaccine: vax,
            secondDate: recommendedDate
        })
        
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
            <div>
                <form onSubmit={e => {
                    this.props.handleFormSubmit(e, this.state)
                    this.props.openPortal()
                }}>
                    <label>Location of First Vaccination:</label><br/>
                    <select className="input" defaultValue="default" onChange={(e) => this.chooseLocation(e.target.value)}>
                        <option disabled value="default"></option>
                        {this.props.locations.features.map(location => <option value={location.properties.id}>{location.properties.name}</option>)}
                    </select><br/>
                    {this.state.location ? <><label>Date of First Vaccination:</label><br/>
                        <DatePicker date={this.state.date} onDateChange={this.chooseDate} locale={enGB} format='MMM dd yyyy'>
                            {({ inputProps, focused }) => (
                                <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    { ...inputProps}
                                    placeholder="mm/dd/yyyy"
                                />
                            )}
                        </DatePicker></> : null}
                    {this.state.date ? <><label>Vaccine Administered:</label><br/>
                    <select className="input" defaultValue="default" onChange={e => this.chooseVaccine(e.target.value)}>
                        <option disabled value="default"></option>
                        {this.props.vaccines.map(vax => <option value={vax.id}>{vax.name}</option>)}
                    </select><br/> </> : null}
                    {this.state.vaccine 
                    ? <><div>{this.state.vaccine.name} recommends {this.state.vaccine.weeks_between_doses} weeks between doses.</div>
                    <label>Date of Second Dose:</label><br/>
                        <DatePicker date={this.state.secondDate} onDateChange={this.chooseSecondDate} locale={enGB} format='MMM dd yyyy'>
                            {({ inputProps, focused }) => (
                                <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    { ...inputProps}
                                    placeholder="mm/dd/yyyy"
                                />
                            )}
                        </DatePicker></>
                    : null}
                    {this.state.secondDate ? <div>
                        <div>Available Appointment Times:</div>
                        <select className='input' defaultValue='default'
                            onChange={(e) => this.chooseSecondTime(e.target.value)}>
                            <option disabled value='default'></option>
                            {arrayOfTimes.map((time) => <option value={new Date(this.state.year, this.state.month, this.state.day, time)}>{format(new Date(this.state.year, this.state.month, this.state.day, time), 'h:mmaaa')}</option>)}
                        </select> <br/>
                        <input type="submit"></input>
                        </div> : null}
                </form>
            </div>
        )
    }
}

export default SecondAppointmentForm