import React from 'react';
import mapboxgl from 'mapbox-gl';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { format, getDay } from 'date-fns';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class LocationDetails extends React.Component {
    state = {
        date: "",
        month: "",
        day: "",
        year: "",
        timeOptions: [],
        time: "",
        location: "",
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: this.props.location.geometry.coordinates,
            zoom: 13,
            scrollZoom: false
        });

        map.on('load', () => {
            map.addSource('places', {
              type: "geojson",
              data: this.props.location
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
            location: this.props.location
        })
    }

    addMarkers = (map) => {
        let marker = this.props.location
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
        let location = this.props.location
        let daysClosed = location.properties.daysClosed.map(day => parseInt(day))
        let modifiers = { 
            disabled: date => daysClosed.includes(getDay(date))
        }

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
                        <div>{location.properties.address}</div>
                        <div>{location.properties.city} · {location.properties.state} · {location.properties.postalCode}</div>
                        <div>{location.properties.phoneFormatted}</div>
                        <br/>
                        <form onSubmit={e => {
                            this.props.handleFormSubmit(e, this.state)
                            this.props.openPortal()
                            }}>
                            <div>Available Appointment Dates:</div>
                            <DatePicker date={this.state.date} onDateChange={this.chooseDate} locale={enGB} format='MMM dd yyyy' modifiers={modifiers}>
                                {({ inputProps, focused }) => (
                                    <input
                                        className={'input' + (focused ? ' -focused' : '')}
                                        { ...inputProps}
                                        placeholder="mm/dd/yyyy"
                                    />
                                )}
                            </DatePicker>
                            {this.state.date ? <div><div>Available Appointment Times:</div>
                            <select className='input' 
                                onChange={(e) => this.chooseTime(e.target.value)}>
                                <option disabled selected></option>
                                {arrayOfTimes.map((time) => <option value={new Date(this.state.year, this.state.month, this.state.day, time)}>{format(new Date(this.state.year, this.state.month, this.state.day, time), 'h:mmaaa')}</option>)}
                            </select> <br/></div> : null}
                            {this.state.time ? <input className='input' 
                                type='submit'></input> : null}
                        </form>
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}

export default LocationDetails;