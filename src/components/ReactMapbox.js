import React from 'react';
import ReactMapGL, {Marker, FlyToInterpolator} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class ReactMapbox extends React.Component {
    state = {
        viewport: {
            latitude: 29.7724,
            longitude: -95.4103,
            zoom: 11,
            width: '100vw',
            height: '100vh'
        }
    }

    handleViewportChange = viewport => {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        })
    }

    markers = 
        this.props.locations.features.map( mrker => {
            return (
                <Marker key={mrker.properties.name} 
                    longitude={Number(mrker.geometry.coordinates[0])} 
                    latitude={Number(mrker.geometry.coordinates[1])}
                    id={`marker-${mrker.properties.id}`}
                    className="marker" 
                    offsetTop={-23}
                    onClick={ev => this.handleMarkerClick(ev, mrker)}>
                </Marker>
            )
          })
    
    handleMarkerClick = (ev, marker) => {
        // this.flyToStore(marker);
        // this.createPopUp(marker);
        var activeItem = document.getElementsByClassName('active')
        ev.stopPropagation();
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        var listing = document.getElementById(`listing-${marker.properties.id}`)
        listing.classList.add('active')
    }
    

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={this.handleViewportChange}
                transitionInterpolator={new FlyToInterpolator()}
            >
                {this.markers}
            </ReactMapGL>
        )
    }

}

export default ReactMapbox;
