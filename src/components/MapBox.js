import React from 'react';
import mapboxgl from 'mapbox-gl';
import Location from './Location';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcXVlZW5iZWVicyIsImEiOiJja2xpaWI2am8wMXdxMnZsanpncjZza2dqIn0.Y_gIhyTKN5URI1TOxbKfiQ';

class MapBox extends React.Component {
    state = {
        stores: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.034084142948,
                    38.909671288923
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 234-7336",
                  "phone": "2022347336",
                  "address": "1471 P St NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 15th St NW",
                  "postalCode": "20005",
                  "state": "D.C.",
                  "id": 1
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.049766,
                    38.900772
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 507-8357",
                  "phone": "2025078357",
                  "address": "2221 I St NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 22nd St NW",
                  "postalCode": "20037",
                  "state": "D.C.",
                  "id": 2
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.043929,
                    38.910525
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 387-9338",
                  "phone": "2023879338",
                  "address": "1512 Connecticut Ave NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at Dupont Circle",
                  "postalCode": "20036",
                  "state": "D.C.",
                  "id": 3
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.0672,
                    38.90516896
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 337-9338",
                  "phone": "2023379338",
                  "address": "3333 M St NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 34th St NW",
                  "postalCode": "20007",
                  "state": "D.C.",
                  "id": 4
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.002583742142,
                    38.887041080933
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 547-9338",
                  "phone": "2025479338",
                  "address": "221 Pennsylvania Ave SE",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "btwn 2nd & 3rd Sts. SE",
                  "postalCode": "20003",
                  "state": "D.C.",
                  "id": 5
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -76.933492720127,
                    38.99225245786
                  ]
                },
                "properties": {
                  "address": "8204 Baltimore Ave",
                  "city": "College Park",
                  "country": "United States",
                  "postalCode": "20740",
                  "state": "MD",
                  "id": 6
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.097083330154,
                    38.980979
                  ]
                },
                "properties": {
                  "phoneFormatted": "(301) 654-7336",
                  "phone": "3016547336",
                  "address": "4831 Bethesda Ave",
                  "cc": "US",
                  "city": "Bethesda",
                  "country": "United States",
                  "postalCode": "20814",
                  "state": "MD",
                  "id": 7
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.359425054188,
                    38.958058116661
                  ]
                },
                "properties": {
                  "phoneFormatted": "(571) 203-0082",
                  "phone": "5712030082",
                  "address": "11935 Democracy Dr",
                  "city": "Reston",
                  "country": "United States",
                  "crossStreet": "btw Explorer & Library",
                  "postalCode": "20190",
                  "state": "VA",
                  "id": 8
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.10853099823,
                    38.880100922392
                  ]
                },
                "properties": {
                  "phoneFormatted": "(703) 522-2016",
                  "phone": "7035222016",
                  "address": "4075 Wilson Blvd",
                  "city": "Arlington",
                  "country": "United States",
                  "crossStreet": "at N Randolph St.",
                  "postalCode": "22203",
                  "state": "VA",
                  "id": 9
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -75.28784,
                    40.008008
                  ]
                },
                "properties": {
                  "phoneFormatted": "(610) 642-9400",
                  "phone": "6106429400",
                  "address": "68 Coulter Ave",
                  "city": "Ardmore",
                  "country": "United States",
                  "postalCode": "19003",
                  "state": "PA",
                  "id": 10
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -75.20121216774,
                    39.954030175164
                  ]
                },
                "properties": {
                  "phoneFormatted": "(215) 386-1365",
                  "phone": "2153861365",
                  "address": "3925 Walnut St",
                  "city": "Philadelphia",
                  "country": "United States",
                  "postalCode": "19104",
                  "state": "PA",
                  "id": 11
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.043959498405,
                    38.903883387232
                  ]
                },
                "properties": {
                  "phoneFormatted": "(202) 331-3355",
                  "phone": "2023313355",
                  "address": "1901 L St. NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 19th St",
                  "postalCode": "20036",
                  "state": "D.C.",
                  "id": 12
                }
              }
            ]
          },
        map: ""
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-77.034084, 38.909671],
            zoom: 13,
            scrollZoom: false
        });

        map.on('load', () => {
            map.addLayer({
                "id": "locations",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": this.state.stores
                }
            })
        })

        map.on('click', (e) => {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ['locations']
          })

          if (features.length) {
            var clickedPoint = features[0]
            this.flyToStore(clickedPoint)
            this.createPopUp(clickedPoint)
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById('listing-' + clickedPoint.properties.id);
            listing.classList.add('active');
          
          }
        })

        this.setState({
          map: map
        })
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
        .setHTML('<h3>Vaccine Hub</h3>' + '<h4>' + currentFeature.properties.address + '</h4>')
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

    render() {
        return (
            <div>
                <div className='sidebar'>
                    <div className='heading'>
                        <h1>Vaccination Centers</h1>
                    </div>
                    <div id='listings' className='listings'>
                        {this.state.stores.features.map(store => <Location store={store} key={store.properties.id} handleClick={this.handleClick}/>)}
                    </div>
                </div>
                <div id="map" className="map"></div>
            </div>
        )
    }
}



export default MapBox;