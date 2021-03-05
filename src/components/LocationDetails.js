import React from 'react';
import mapboxgl from 'mapbox-gl';
import { format, getDay } from 'date-fns';
import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class LocationDetails extends React.Component {
    state = {
        date: null,
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
            date: new Date(date),
            month: parseInt(format(date, 'M')) - 1,
            day: parseInt(format(date, 'd')),
            year: parseInt(format(date, 'y'))
        })
    }

    chooseTime = (time) => {
        this.setState({time: time})
    }

    disabledDates = (date) => {
        let location = this.props.location
        let daysClosed = location.properties.daysClosed.map(day => parseInt(day))
        return daysClosed.includes(getDay(date))
    }

    render() {
        let location = this.props.location
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
                        <Button
                            onClick={() => this.props.chooseLocation("")}>
                            <ArrowBackIcon/>Back
                        </Button>
                        <div className="location-details">
                            <div>{location.properties.address}</div>
                            <div>{location.properties.city} · {location.properties.state} · {location.properties.postalCode}</div>
                            <div>{location.properties.phoneFormatted}</div>
                        <br/>
                        <form onSubmit={e => {
                            this.props.handleFormSubmit(e, this.state)
                            this.props.openPortal()
                            }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker value={this.state.date} 
                                    onChange={this.chooseDate}
                                    shouldDisableDate={this.disabledDates}
                                    emptyLabel="Appointment Dates" />
                            </MuiPickersUtilsProvider>
                            {this.state.date 
                                ? <div>
                                    <FormControl>
                                    <Select className='input submit-btn' 
                                        value={this.state.time}
                                        label="Appointment Times"
                                        onChange={(e) => this.chooseTime(e.target.value)}
                                        displayEmpty
                                        >
                                        <MenuItem value="" disabled>Available Times</MenuItem>
                                        {arrayOfTimes.map((time) => <MenuItem value={new Date(this.state.year, this.state.month, this.state.day, time).toString()}>{format(new Date(this.state.year, this.state.month, this.state.day, time), 'h:mmaaa')}</MenuItem>)}
                                    </Select> 
                                    </FormControl>
                                    <br/>
                                    </div> : null}
                            {this.state.time ? <div className="submit-btn"><Button className='input' 
                                type='submit'
                                variant="outlined">Submit</Button></div> : null}
                        </form>
                        </div>
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}

export default LocationDetails;


