
///All Lesson 41
//npm i react-google-maps react-google-autocomplete 

import React, { Component } from 'react'
//another way to  do it
// import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';


import Gmap from '../Components/GoogleMap'


export class GoogleMapsPage extends Component {

  
    render() {

   //example of other way  to do it.
        // function Map() {
        //     return (
              
        //         <GoogleMap defaultZoom={10} defaultCenter={{lat: -33.8688,lng: 151.2093}}>
        //              {/* <Marker  position={{lat: latitude,lng: longitude}} /> */}
        //         </GoogleMap>
        //     )
        // }
        // const WrappedMap = withScriptjs(withGoogleMap(Map));

        return (
               <div >
               <Gmap/>
               </div>
               
               //example of other way  to do it.
                 //<WrappedMap
                // loadingElement={<div style={{ height: `100%` }} />}
                // containerElement={<div style={{ height: `500px` }} />}
                // mapElement={<div style={{ height: `100%` }} />}
                // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI`} />
             
        )
    }
}
export default GoogleMapsPage
