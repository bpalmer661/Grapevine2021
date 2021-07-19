////npm i react-google-maps react-google-autocomplete 
//npm i google-maps-react
 import {
     Map,
GoogleApiWrapper,
 Marker} 
 from 'google-maps-react';
 
import React, { Component } from 'react'


import  {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
 
export class MapContainer extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
             address: '' ,
    
        mapCenter: {
            lat: -33.8688,
            lng: 151.2093,
        }
    }
      }

   
      getLocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }
     
        showPosition = (position) => {
const latlng = {lat:position.coords.latitude , lng:position.coords.longitude}
this.setState({  
    mapCenter: latlng
});
        }
      
   

    handleChange = address => {
        this.setState({ address });
      };
     

      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng)
              this.setState({
                  address,
              });
              this.setState({
                mapCenter: latLng
            });
          })
          .catch(error => console.error('Error', error));
      };
   
    render() {

        const { lat , lng} = this.state.mapCenter
    
        
      return (
<div  >

      <br/>
      <div >

        <Map google={this.props.google}
            style={{ height: '500px', width: '900px'  }}

            initialCenter={{
                lat: lat,
                lng: lng,
               }}
            
               center={{
                lat: lat,
                lng: lng,
               }}
            >
          
   <Marker
position={{
    lat: lat,
    lng: lng,
   }}
   />
        </Map>
        </div>
        </div>

      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ("AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI")
  })(MapContainer)