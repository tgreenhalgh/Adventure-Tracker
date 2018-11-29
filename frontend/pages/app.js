import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      polylines: []
    };
    this.NOT_STARTED = 'NOT_STARTED';
    this.IN_PROGRESS = 'IN_PROGRESS';
    this.COMPLETED = 'COMPLETED';
  }
  componentDidMount() {
    // this.setState({ markers:  });
  }
  //distance in miles
  //distance matrix
  //create the ETA
  addLines = markers => {
    // thin grey is not reached yet and the person has not started that path
    const greyLine = {
      strokeWeight: 5,
      strokeColor: '#969696'
    };
    // a dashed line is in-progress, the person has started on that path
    // Doc for dashed-line: https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    const dashedLine = {
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }
      ]
    };
    // solid black line means the path was traversed
    const solidBlackLine = {
      strokeWeight: 7,
      strokeColor: '#000000'
    };
    const lines = [];
    let line = [];
    for (let i = 0; i < markers.length; i++) {
      let lineOptions = {};
      //Depending on marker's status, this will choose what type of line to use
      if (marker[i].status === this.NOT_STARTED) {
        lineOptions = {
          ...greyLine
        };
      } else if (marker[i].status === this.IN_PROGRESS) {
        lineOptions = {
          ...dashedLine
        };
      } else if (marker[i].status === this.COMPLETED) {
        lineOptions = {
          ...solidBlackLine
        };
      }
      //set the lat and lng dot
      line.push([markers[i].lat, markers[i].lng]);

      //Every two markers set consecutively, add a new polyline
      if (i > 0) {
        lineOptions['path'] = line;
        lines.push(lineOptions);
        //Reset for new line
        line = [[markers[i].lat, markers[i].lng]];
      }
    }

    this.setState({ polylines: lines });
  };
  mapClicked = (mapProps, map, clickEvent) => {
    console.log(clickEvent.xa);
    const myLatLng = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    const { markers } = this.state;
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const amountOfMarkers = markers.length;
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      id: amountOfMarkers,
      title: String(amountOfMarkers),
      label: labels[amountOfMarkers % labels.length],
      //NOT_STARTED, IN_PROGRESS, COMPLETED - NOT_STARTED is default
      status: this.NOT_STARTED
    });
    console.log(marker.position);
    this.setState({ markers: [...markers, marker] });
    // Line coords takes an array of arrays which specifies where the dots are
    // Need to use the marker coordinates in order to make those lines
    // Somehow specify what type of line it is

    const InfoWindow = new google.maps.InfoWindow({
      content:
        '<b>Marker Coordinates : </b> <br><b>Latitude : </b>' +
        marker.position.lat() +
        '<br><b>Longitude: </b>' +
        marker.position.lng(),
      position: marker.position
    });
    marker.addListener('click', function() {
      InfoWindow.open(map, marker);
    });
  };

  render() {
    const { markers, polylines } = this.state;

    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={4}
      >
        {markers.map(mark => {
          return (
            <Marker
              title={mark.title}
              id={mark.id}
              key={mark.key}
              position={{ lat: mark.position.lat, lng: mark.position.lng }}
            />
          );
        })}
        {polylines.map((line, i) => {
          return (
            <Polyline
              key={i}
              path={line.path}
              strokeColor={line.strokeColor}
              strokeWeight={line.strokeWeight}
            />
          );
        })}
        }
        {/* <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: 37.778519, lng: -122.40564 }}
        />
        <Marker name={'Dolores park'} position={{ lat: 37.759703, lng: -122.428093 }} />
        <Marker />
        <Marker
          name={'Your position'}
          position={{ lat: 37.762391, lng: -122.439192 }}
          icon={{
            url: '/path/to/custom_icon.png',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
          }}
        /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYNQBttgqum1eAf8O90Ho7nm5b8mzfmMI'
})(MapContainer);
