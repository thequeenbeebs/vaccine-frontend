import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'react-nice-dates/build/style.css'
import { format, getDay } from 'date-fns';
import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class EditAppointmentForm extends React.Component {
    state = {
        date: new Date(this.props.selectedAppointment.appointment_time),
        month: "",
        day: "",
        year: "",
        timeOptions: [],
        time: new Date(this.props.selectedAppointment.appointment_time),
        selectedAppointment: this.props.selectedAppointment,
        location: {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": this.props.selectedAppointment.vaccination_center.coordinates
            },
            "properties": {
                "name": this.props.selectedAppointment.vaccination_center.name,
                "phoneFormatted": this.props.selectedAppointment.vaccination_center.phone_number,
                "address": this.props.selectedAppointment.vaccination_center.address,
                "city": this.props.selectedAppointment.vaccination_center.city,
                "state": this.props.selectedAppointment.vaccination_center.state,
                "postalCode": this.props.selectedAppointment.vaccination_center.zip_code,
                "id": this.props.selectedAppointment.vaccination_center.id,
                "daysClosed": this.props.selectedAppointment.vaccination_center.days_closed,
                "openingHour": this.props.selectedAppointment.vaccination_center.opening_hour,
                "closingHour": this.props.selectedAppointment.vaccination_center.closing_hour,
                "appointmentsPerHour": this.props.selectedAppointment.vaccination_center.appointments_per_hour
            }
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: this.state.location.geometry.coordinates,
            zoom: 13,
            scrollZoom: false
        });

        map.on('load', () => {
            map.addSource('places', {
              type: "geojson",
              data: this.state.location
            })
            this.addMarkers(map);
    
        })

        let times = 25
        let updatedTimeOptions = []
        let time = ""
        for (let i = 1; i < times; i++) {
            time = new Date(2021, 2, 25, i, 0)
            updatedTimeOptions = [...updatedTimeOptions, time]
        }
        this.setState({
            timeOptions: updatedTimeOptions,
            month: parseInt(format(this.state.date, 'M')) - 1,
            day: parseInt(format(this.state.date, 'd')),
            year: parseInt(format(this.state.date, 'y'))
        })
    }

    addMarkers = (map) => {
        let marker = this.state.location
        var el = document.createElement('div')
            el.id = `marker-${marker.properties.id}`
            el.className = "marker"
        new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
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

    disabledDates = (date) => {
        let location = this.state.location
        let daysClosed = location.properties.daysClosed.map(day => parseInt(day))
        return daysClosed.includes(getDay(date))
    }

    render() {
        let location = this.state.location
        let arrayOfTimes = []
        let i = location.properties.openingHour
        while (i < location.properties.closingHour) {
            arrayOfTimes.push(i)
            i++
        }

        return(
            <div className="map-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>{location.properties.name}</h1>
                    </div>
                    <div id='listings' className='listings'>
                        <div className="location-details">
                        <div>{location.properties.address}</div>
                        <div>{location.properties.city} · {location.properties.state} · {location.properties.postalCode}</div>
                        <div>{location.properties.phoneFormatted}</div>
                        
                        <br/>
                        <form onSubmit={e => {
                            this.props.handleEditFormSubmit(e, this.state)
                            this.props.openPortal()
                            }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker value={this.state.date} 
                                    onChange={this.chooseDate}
                                    shouldDisableDate={this.disabledDates}
                                    emptyLabel="Appointment Dates" />
                            </MuiPickersUtilsProvider>
                            <div>
                            <FormControl>
                                <Select className='input submit-btn' 
                                        value={this.state.time}
                                        label="Appointment Times"
                                        onChange={(e) => this.chooseTime(e.target.value)}
                                        displayEmpty
                                        emptyLabel="Appointment Times"
                                        >
                                        <MenuItem value="" disabled>Available Times</MenuItem>
                                        {arrayOfTimes.map((time) => <MenuItem value={new Date(this.state.year, this.state.month, this.state.day, time).toString()}>{format(new Date(this.state.year, this.state.month, this.state.day, time), 'h:mmaaa')}</MenuItem>)}
                                </Select> 
                            </FormControl><br/>
                            </div>
                            <div className="submit-btn"><Button className='input' 
                                type='submit'
                                variant="outlined">Submit</Button></div>
                        </form>
                        </div>
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}

export default EditAppointmentForm;
