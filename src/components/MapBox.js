import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Location from './Location';
// import turf from 'turf-jsts';
// import Geocoder from "react-map-gl-geocoder";
// import ReactMapbox from './ReactMapbox';

// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class MapBox extends React.Component {
    state = {
        map: "",
        locations: ""
    }

    componentDidMount() {
        this.setState({locations: this.props.locations})

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-95.4103, 29.7724],
            zoom: 11,
            scrollZoom: false
        });

        map.on('load', () => {
            map.addSource('places', {
              type: "geojson",
              data: this.props.locations
            })
            this.addMarkers();

            var geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken, 
              mapboxgl: mapboxgl, 
              marker: true
            });
            
            map.addControl(geocoder, 'top-left');

            // geocoder.on('result', (ev) => {this.findDistance(ev)});
        })

        this.setState({
          map: map
        })
    }

    flyToStore = currentFeature => {
      this.state.map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 11
      })
    }

    createPopUp = currentFeature => {
      var popUps = document.getElementsByClassName('mapboxgl-popup')
      if (popUps[0]) popUps[0].remove();
      var popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>${currentFeature.properties.name}</h3><div>${currentFeature.properties.address}
          ${currentFeature.properties.city} · ${currentFeature.properties.state} · ${currentFeature.properties.postalCode} · ${currentFeature.properties.phoneFormatted}</div>
          `)
        .addTo(this.state.map);
    }

    handleClick = location => {
      this.flyToStore(location)
      this.createPopUp(location)
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var listing = document.getElementById('listing-' + location.properties.id);
      listing.classList.add('active')
    }

    addMarkers = () => {
      this.props.locations.features.forEach(marker => {
        var el = document.createElement('div')
            el.id = `marker-${marker.properties.id}`
            el.className = "marker"
            el.addEventListener('click', (e) => {
              this.flyToStore(marker);
              this.createPopUp(marker);
              var activeItem = document.getElementsByClassName('active')
              e.stopPropagation();
              if (activeItem[0]) {
                activeItem[0].classList.remove('active');
              }
              var listing = document.getElementById(`listing-${marker.properties.id}`)
              listing.classList.add('active')
            })
        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.state.map);
      })
    }

    // findDistance = (ev) => {
    //   var searchResult = ev.result.geometry;
    //   var options = { units: 'miles' };
    //   this.props.locations.features.forEach(function(store) {
    //     Object.defineProperty(store.properties, 'distance', {
    //       value: turf.distance(searchResult, store.geometry, options),
    //       writable: true,
    //       enumerable: true,
    //       configurable: true
    //     });
    //   });
    // }

    render() {
        return (
            <div className="map-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>Select A Location:</h1>
                    </div>
                    <div id='listings' className='listings'>
                        {this.props.locations.features ? this.props.locations.features.map(store => <Location store={store} key={store.properties.id} handleClick={this.handleClick} chooseLocation={this.props.chooseLocation}/>) : null}
                    </div>
                </div>
                <div id="map" className="map">
                </div>
            </div>
            
        )
    }
}



export default MapBox;