// /*global google*/
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  //npm i react-places-autocomplete

import React, { useState , useEffect} from "react";
  import SearchBar from '../SearchBar'
  import SimpleMenu from '../SimpleMenu'
  // import JobsOrPersonsMenu from '../JobsOrPersonsMenu'

  
  import { useDispatch } from "react-redux";

  
  import { setStoreCoordinates} from '../../redux/actions/dataActions'
 


  import "./CompleteSearchBarStyling.css"





import styled from "styled-components";



const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  // margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};


export default function CompleteSearchBar(props) {

    const [gmapsLoaded, setGmapsLoaded] = useState(false);

    //state as in states and territories
  const [state, setState] = useState("")
  const [address,setAddress] = useState("");
  const [coordinates,setCoordinates] = useState({
    lat:"",
    lng:"",
  })


  const dispatch = useDispatch();

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)


         var filtered_array = results[0].address_components.filter(function(address_component){
            return address_component.types.includes("administrative_area_level_1");
        }); 
        
        var state = filtered_array.length ? filtered_array[0].long_name: "";
        
        const getLatitudeLongitude = await getLatLng(results[0])
      
        console.log(getLatitudeLongitude)



      console.log(state)
        setState(state)
        if (value !== null){
        setAddress(value)
        }
        
        localStorage.setItem("address",value)
        localStorage.setItem("persistedState",state)
        setCoordinates(getLatitudeLongitude)

         localStorage.setItem("searchLat",getLatitudeLongitude.lat)
         localStorage.setItem("searchLng",getLatitudeLongitude.lng)

        }



        useEffect(() => {
const persistedAddress = localStorage.getItem("address")
const persistedState = localStorage.getItem("state")

if (persistedAddress !== null){
  setAddress(persistedAddress)
  }


setState(persistedState)
            }, [])



    //initialize google places auto complete
// This is the same as componentDidMount() 
useEffect(() => {
    if (gmapsLoaded === false ) {
        window.initMap = () => setGmapsLoaded(true)
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
        //stops error
        window.google = {}
    }
      }, [gmapsLoaded])


      useEffect(() => {
       dispatch(setStoreCoordinates(coordinates));
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [state,coordinates])

      
       

    return (
        <div 
        styles={{marginBottom: 50,padding:330,color:"black"}}
        className="complete-search-bar">
            <SearchBar />
          
          
            { gmapsLoaded && (
              <div style={{marginRight: 10, width: 400}}>
<PlacesAutocomplete
        fullWidth
        className="search-bar"
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={ {
          types: ['(cities)'],
          componentRestrictions: {country: 'au'}
    }} 
        
       
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
         
          <div >
            <input
            style={{
              width:"100%" ,
            height: "44px",
            border: "1px solid #dfe1e5",
            borderRadius: "0px",
            backgroundColor: "white",
            boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
            hoverBackgroundColor: "#eee",
            color: "#212121",
            fontSize: "16px",
            fontFamily: "Arial",
            iconColor: "grey",
            lineColor: "rgb(232, 234, 237)",
            placeholderColor: "red",
            marginLeft:"10px",
             outline: "none",
          }}
            value=""
              {...getInputProps({
                placeholder: `Select Location Via Suburb`,
                className: 'location-search-input',
              })}
            />



            <div 
              style={{marginLeft:"10px"}}
            className="autocomplete-dropdown-container"

             key={suggestions.description}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index)=> {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  
                  <div
                  style={{marginLeft:"10px"}}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span
                      style={{marginLeft:"10px"}}
                    >{suggestion.description }</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </div>
      
)}

<SimpleMenu/>

{/* <JobsOrPersonsMenu/> */}


<Button 
style={{
  marginLeft: "10px",
  height: "46.5px",
  width:"200px",

}}
onClick={() =>
  props.searchFunction()}
  >
Search
</Button>


</div>
    )
}
