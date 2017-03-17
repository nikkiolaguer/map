import React, { Component } from 'react';
//import FontAwesome from 'react-fontawesome';
import './App.css';
import moment from 'moment';
import { divIcon, Point } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import data from './photos/data.json';

const position = [14.58, 121];
const icon = divIcon({className: 'my-div-icon', iconSize: new Point(50, 42), iconAnchor: new Point(25, 3)});

class App extends Component {
  render() {
    return (
      <Map center={position} zoom={3} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.data.map(marker => (
          <Marker key={marker.title} position={marker.position} icon={icon}>
            <Popup>
              <span>
                <h1>{marker.title}</h1>
                {marker.dates.map(date => (
                  <span key={date.date}>
                    <h3>{moment(date.date).format('MMMM YYYY')}</h3>                    
                    <div>
                      <img src={require(`./${date.image}`)} alt={date.description} />
                    </div>
                    <a href={date.url}>Photos</a>
                    <br />
                    {date.description}
                    <br />
                  </span>
                ))}
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>    
    );
  }
}

export default App;
