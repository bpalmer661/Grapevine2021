
///*global google*/

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  //npm i react-places-autocomplete

  import { useEffect, useState } from 'react';

import React, { Fragment } from 'react';

import { db } from "../FirebaseConfig";
import Add from '@material-ui/icons/Add';

import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux';




//mui
import { 
    //Tooltip,
     DialogTitle, 
     DialogContent,
      TextField, 
      DialogActions } 
      from '@material-ui/core';
import Button from '@material-ui/core/Button';

import MyButton from '../util/MyButton';

import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//mui
import Muilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//icons
import CalenderToday from '@material-ui/icons/CalendarToday';

import { uploadImage, getUsersProfileData, setStoreServices , addImageToProfile, deleteImageFromProfile, updateUserInfo} from '../redux/actions/userActions';

import CircularProgress from '@material-ui/core/CircularProgress';



  const options = [
    { label: "Plumbing", value: "Plumbing"},
    { label: "Electrical", value: "Electrical" },
    { label: "Carpentry", value: "Carpentry" },
    { label: "Fencing", value: "Fencing" },
    { label: "Plastering", value: "Plastering" },
    { label: "Air-conditioning and Refrigeration", value: "Air-conditioning and Refrigeration" },
    { label: "Arborist", value: "Arborist" },
    { label: "Automotive Electrician", value: "Automotive Electrician" },
    { label: "Bricklayer", value: "Bricklayer" },
    { label: "Cabinetmaker", value: "Cabinetmaker" },
    { label: "Diesel Mechanic", value: "Diesel Mechanic" },
    { label: "Welding", value: "Welding" },
    { label: "Metal Worker", value: "Metal Worker" },
    { label: "Floor Sanding & Polishing", value: "Floor Sanding & Polishing" },
    { label: "Gas Fitting", value: "Gas Fitting" },
    { label: "Glazier", value: "Glazier" },
    { label: "Landscape Gardener", value: "Landscape Gardener" },
    { label: "Lift Mechanic", value: "Lift Mechanic" },
    { label: "Locksmith", value: "Locksmith" },
    { label: "Metal Fabricator", value: "Metal Fabricator" },
    { label: "Motorcycle Mechanic", value: "Motorcycle Mechanic" },
    { label: "Painting", value: "Painting" },
    { label: "Panelbeating", value: "Panelbeating"},
    { label: "Roof Plumbing", value: "Roof Plumbing"},
    { label: "Roof Tiler", value: "Roof Tiler" },
    { label: "Signwriting", value: "Signwriting" },
    { label: "Stone Masonry", value: "Stone Masonry" },
    { label: "Attenas", value: "Anttenas" },
    { label: "Gutter Cleaning", value: "Gutter Cleaning" },
    { label: "Roof Repairs", value: "Roof Repairs" },
    { label: "Fencing", value: "Fencing" },
    { label: "Fencing", value: "Fencing" },
    { label: "Fencing", value: "Fencing" },
    { label: "Fencing", value: "Fencing" },
    { label: "Fencing", value: "Fencing" },
    
];





// Telecommunications Linesworker
// Telecommuncations Technician
// Toolmaker
// Upholsteror
// Vehicle Body Builder
// Vehicle Painter
// Vehicle Trimmer
// Wall and Floor Tiler
// Welder (First class)
// Wood Machinist
 
  


    export default function EditProfilePage() {

       

    var ImageLoading = useSelector(state => state.user.loading)

        //values from redux store
  const store = useSelector(state => state.user.credentials)
  

  var uname = store.username
  var credentials = store
  var createdAt = store.createdAt
  var userImageUrl = store.userImageUrl
var usersState = store.state ?? ""
var usersAddress = store.address ?? ""
  var email = store.email ?? ""
  var usersCoordinates = store.coordinates 
var services = store.services
  var userId = store.userId
var usersServicesDescription = store.servicesDescription ?? ""
var images = store.images ?? ""
var theWebsite = store.website ?? ""
var theNumber = store.number ?? ""

const dispatch = useDispatch();

      
      
      
/* eslint-disable */
        const [loading, setLoading] = useState(false)
      
        const [state, setState] = useState("")
      
      const [address,setAddress] = useState("");
      const [location,setLocation] = useState("");
      
      const [category, setCategory] = useState("");
      
      const [categoryError, setCategoryError] = useState("")

      const [website, setWebsite] = useState("")

      
      const [number, setNumber] = useState("")



      const [username, setUsername] = useState("")

      const [bio, setBio] = useState("")

      const [theSelected, setSelected] = useState([]);


      const [servicesDescription, setServicesDescription] = useState("Description Of Services");


      const [coordinates,setCoordinates] = useState({
        lat:null,
        lng:null,
      })
      
      const [error,setError] = useState(null)
       
      
      const [gmapsLoaded, setGmapsLoaded] = useState(true)

    





      
      useEffect(() => {
        return () => {
            // Anything in here is fired on component unmount.
           setGmapsLoaded(false)
        }
    }, [])


      useEffect(() => {


          console.log("use effect [gmapsLoaded] called inside editProfilePage")


        if (gmapsLoaded === false ) {


            window.initMap = () => setGmapsLoaded(true)
            const gmapScriptEl = document.createElement(`script`)
            gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI&libraries=places&callback=initMap`
            document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
            //stops error
            window.google = {}
        }
        dispatch(getUsersProfileData())

if (usersAddress !== null){
        setAddress(usersAddress)
}
        setState(usersState)
        mapUserDetailsToState(credentials)
        setServicesDescription(usersServicesDescription)
        setSelected(services)
        setCoordinates(usersCoordinates)
          setWebsite(theWebsite)
          setNumber(theNumber)
  
       
          }, [gmapsLoaded])
      
      
    
  
//Handle Change And Handle Select Functions

    const handleChangeWebsite = (e) => {
        setWebsite(e.target.value)
      }

      const handleChangeNumber = (e) => {
        setNumber(e.target.value)
      }

      




      const handleChangeBio = (e) => {
        setBio(e.target.value)
        }
        
        const handleChangeServicesDescription = (e) => {
            setServicesDescription(e.target.value)
          }



       const handleImageChange = (event) => {
            const image = event.target.files[0];
           const formData = new FormData();
           formData.append('image', image, image.name);
         dispatch(uploadImage(formData))
        };

        const handleEditPicture = () => {
            const fileInput = document.getElementById('imageInput')
            fileInput.click();
        }
        

        const  handleRemove = (url, username) => {
        
           dispatch(deleteImageFromProfile(url,uname))
           }
           
       




const handleImageChangeToGallery = (event) => {
  
 const image = event.target.files[0];
const formData = new FormData();
formData.append('image', image, image.name);
dispatch(addImageToProfile(formData))
};


const addImageToGallery = () => {
 const fileInput = document.getElementById('imageInputGallery')
 fileInput.click();
}



      
          



          useEffect(() => {

            dispatch(getUsersProfileData())
          }, [theSelected]);



         



const mapUserDetailsToState = (credentials) => {

setUsername(credentials.username? credentials.username : '')

   
};

const onChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    });
}


const handleSelect = async value => {
    const results = await geocodeByAddress(value)
  
  
     var filtered_array = results[0].address_components.filter(function(address_component){
      return address_component.types.includes("administrative_area_level_1");
  }); 
  
  var state = filtered_array.length ? filtered_array[0].long_name: "";
  
    const getLatitudeLongitude = await getLatLng(results[0])
  
    
    setState(state)

    setAddress(value)
 
    setCoordinates(getLatitudeLongitude)

  
    
    }
  
    const lastLoginIs = dayjs()

const handleSubmit = () => {

const optionsObject = {};
theSelected.forEach(({value}) => optionsObject[value] = true);

console.log("lastLoginIs: " + lastLoginIs)

const userDetails = {
  bio: bio,
 website: website,
 state: state,
 address: address,
 userImageUrl: userImageUrl,
 coordinates:coordinates,
 ...optionsObject,
username: uname,
 createdAt: createdAt,
 email:email,
  userId: userId,
  servicesDescription: servicesDescription,
  services: theSelected,
  images: images,
  number:  number,
  lastLogin: String(lastLoginIs)
 };


 for ( var i in userDetails ) {
  if ( userDetails[i] === null ) {
      delete userDetails[i];
  }
  if ( userDetails[i] === "" ) {
    delete userDetails[i];
}
}



db.collection("users").doc(username).set(userDetails)
.then(
  () => {
setLoading(false)
console.log("Data Saved Successfully")
alert("Data Saved Successfully")
  }
).catch(error => {
    console.error("this is the error for  handleSubmit EditProfilePage" + error);
  });
       



if  (usersState !== state ){
    if (usersState !== null){
    console.log("will delete from old state")
    db.collection(usersState).doc(uname).delete()
    }
}


if (optionsObject !== undefined){
  if (optionsObject !== ""){
    if (state !== ""){
  
      db.collection(state).doc(uname).set(userDetails)
      .then(
        () => {
    setLoading(false)
     alert("Data Saved Successfully")
  
        }
      ).catch(error => {
          console.error("this is the error for  handleSubmit EditProfilePage" + error);
        });
    
        dispatch(setStoreServices(userDetails))
        
      } else {
        console.log("state was empty string so we don't add user to be found as a trade  in a place")
      }
}
}
dispatch(updateUserInfo(userDetails))
}




        return (

           <Fragment>
<div   
style={{position: "relative"}}
>
        <div className={"editProfileImgDiv"}>
            <img className={"editProfileImgDiv"} 
            src={userImageUrl} 
             alt="profile"/>
          

 
 </div>

 <div 
  className={"editProfilePicture"}
  >
 

 <input 
   type="file"
    id="imageInput" 
    onChange={handleImageChange} 
    hidden="hidden"
    /> 


  <MyButton tip="Edit Profile Picture"
 onClick={handleEditPicture}
  className="button">
<EditIcon color="primary" />
 </MyButton>
 </div>


        <div
        className={"usernameTitleLink"}
        > 
        <Muilink component={Link} 
    to={`/users/${username}`}
     color="primary" variant="h5" >
    {username}
    {/* //Username needs to go here */}
        </Muilink>
        </div>




      <div className="usernameTitleLink">
    



        <Typography variant="body2"
        > 
        Email: { email } 
        </Typography>
        
        <hr style={{width: "300px"}}/>
        
    
        <CalenderToday color="primary"/>{''}
         <span>Joined:  {dayjs(createdAt).format('MMM YYYY')} 
         </span>
    
      </div>


      { ImageLoading && (
<div style={{display: "flex",justifyContent: "center", alignContent:"center"}}>
<CircularProgress/>
</div>

)
    }

<h1> Profile Images </h1>
<h5>Images May Take A Moment To Upload</h5> 
 
    
      <div className="img-grid">
{ images && images.map((url,index) => {
return ( <div  key={index}
  className="img-wrap">
     {/* <span class="close">&times;</span> */}
     <button onClick={ () => handleRemove(url,uname)} className="close">X</button>
<img 
style={{objectFit: 'cover',   resizeMode: 'contain'}}
src={url} alt="uploaded" />
      </div>
)
 }
)}


<div className={"image-wrapper"}> 
   <input 
   type="file"
    id="imageInputGallery" 
    onChange={handleImageChangeToGallery} 
    hidden="hidden"
    /> 
<MyButton tip="Add Image"
 onClick={addImageToGallery}
  className="button">
<Add color="primary" />
 </MyButton>
    </div>
</div>


              
             

    <DialogTitle> Edit Your Details </DialogTitle>
   <DialogContent> 
       <form>
           
  {/* service */}
  <TextField 
           name="service" 
           type="text"
           label="Services Description"
           multiline
           rows="5"
           placeholder="Services Provided"
        //    className={classes.TextField}
           value={servicesDescription}
           onChange={handleChangeServicesDescription}
           fullWidth
           >
           </TextField>

<br/>
<br/>
<br/>
<br/>


           
          {/* website */}
           <TextField 
           name="website" 
           type="text"
           label="Website"
           multiline
           rows="1"
           placeholder="Your Website"
        //    className={classes.TextField}
           value={website}
           onChange={handleChangeWebsite}
           fullWidth
           >
           </TextField>

           <br/>
<br/>
<br/>
<br/>


           
          {/* website */}
           <TextField 
           name="number" 
           type="text"
           label="Number"
           multiline
           rows="1"
           placeholder="Contact Number"
        //    className={classes.TextField}
           value={number}
           onChange={handleChangeNumber}
           fullWidth
           >
           </TextField>

           
           

         
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

<h1> LOCATION </h1>
           
{/* <Typography variant="body2"
        > 
        State: { state } 
        </Typography> */}
        
        <Typography variant="body2"
        > 
         { address } 
        </Typography>
        


       </form>

   </DialogContent>

<DialogActions>




<div
className={"placesAutoCompleteContainer"}
>



{ gmapsLoaded && (
<PlacesAutocomplete
     
        className="search-bar"
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}


    //     searchOptions={ {
    //       location: new google.maps.LatLng(-25, 134),
    //       radius: 2500000,
    //       types: ['address']
    // }} 

    searchOptions={{
      //   location: new google.maps.LatLng(-25, 134),
      //   radius: 2500,
        types: ['(cities)'],
        componentRestrictions: {country: 'au'}
  }} 
       
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
         
          <div>

            <input
            style={{width:"100%", hieght:"50px" }}
        
              {...getInputProps({
                placeholder: 'Enter Address To Set The Local Area You Provide Services In',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container"

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
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description }</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
)}

</div>

<br></br>
<br></br>
      <br></br>
      <br></br>
   

</DialogActions>

<div
  style={{width:"96%", marginLeft
  :"10px" }}
>


<h1> SERVICES </h1>


<MultiSelect

        options={options}
        value={theSelected}
        onChange={
            setSelected
            }
        labelledBy="Select Categories"
      />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

<div className={"saveButton"}>
    <Button
     onClick={handleSubmit}
    color="primary"
    className={"saveButton"}
    >
        Save
    </Button>
    </div>


</div>

<br></br>



 
           </Fragment>
        )
    }



const mapStateToProps = (state) => ({
    user: state.user,
    credentials: state.user.credentials
});


     



