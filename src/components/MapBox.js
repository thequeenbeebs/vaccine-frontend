import React from 'react';
import mapboxgl from 'mapbox-gl';
import Location from './Location';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class MapBox extends React.Component {
    state = {
        map: ""
    }

    componentDidMount() {
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
        })

        this.setState({
          map: map
        })

        // if (this.props.selectedLocation) {
        //   this.flyToStore(this.props.selectedLocation)
        // }
    }

    flyToStore = currentFeature => {
      this.state.map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      })
    }

    createPopUp = currentFeature => {
      var popUps = document.getElementsByClassName('mapboxgl-popup')
      if (popUps[0]) popUps[0].remove();
      var popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3>' + currentFeature.properties.name + '</h3>' + '<h4>' + currentFeature.properties.address + '</h4>')
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

    render() {
        return (
            <div className="map-container">
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>Vaccination Centers</h1>
                    </div>
                    <div id='listings' className='listings'>
                        {this.props.locations.features ? this.props.locations.features.map(store => <Location store={store} key={store.properties.id} handleClick={this.handleClick} chooseLocation={this.props.chooseLocation}/>) : null}
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}



export default MapBox;