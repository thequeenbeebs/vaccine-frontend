import React from 'react';
import mapboxgl from 'mapbox-gl';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { format } from 'date-fns';

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
                "daysOpen": this.props.selectedAppointment.vaccination_center.days_open,
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

    render() {
        let location = this.state.location
        return(
            <div className="map-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>{location.properties.name}</h1>
                    </div>
                    <div id='listings' className='listings'>
                        <div>{location.properties.address}</div>
                        <div>{location.properties.city} · {location.properties.state} · {location.properties.postalCode}</div>
                        <div>{location.properties.phoneFormatted}</div>
                        <br/>
                        <form onSubmit={e => {
                            this.props.handleEditFormSubmit(e, this.state)
                            this.props.openPortal()
                            }}>
                            <div>Available Appointment Dates:</div>
                            <DatePicker date={this.state.date} onDateChange={this.chooseDate} locale={enGB} format='MMM dd yyyy'>
                                {({ inputProps, focused }) => (
                                    <input
                                        className={'input' + (focused ? ' -focused' : '')}
                                        { ...inputProps}
                                        placeholder="mm/dd/yyyy"
                                    />
                                )}
                            </DatePicker>
                            <div>Available Appointment Times:</div>
                            <select className='input' 
                                onChange={(e) => this.chooseTime(e.target.value)}>
                                {this.state.timeOptions.map((time, index) => <option value={new Date(this.state.year, this.state.month, this.state.day, index)}>{format(new Date(this.state.year, this.state.month, this.state.day, index), 'h:mmaaa')}</option>)}
                            </select> <br/>
                            <input className='input' 
                                type='submit'></input>
                        </form>
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}

export default EditAppointmentForm;
