///*global google*/
    import PlacesAutocomplete, {
      geocodeByAddress,
      getLatLng,
    } from 'react-places-autocomplete';
    //npm i react-places-autocomplete
  
    //postjobpostpage.js

import dayjs from 'dayjs'
import React, { useState , useEffect} from "react";
import "../App.css";
import "./PostJobPostPageStyling.css"
// import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/storage';  
import MakeId from "../util/MakeId";  
//import { db, auth, provider, storage } from "../FirebaseConfig";
import { db, storage } from "../FirebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { items } from '../util/categories'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';


import { logoutUser } from '../redux/actions/userActions'

export default function PostJobPostPage() {

//values from redux store
  const store = useSelector(state => state.user.credentials)

  var username = store.username

  var userImageUrl = store.userImageUrl

  var emailFromStore = store.email
  
  //State Variables 

  const [email, setEmail] = useState(emailFromStore)

  const [jobTitle, setJobTitle] = useState("");

  const [jobDescription, setjobDescription] = useState("");

  const [imagesUrlArray, setURls] = useState([])

  const [imagesArray, setImages] = useState([])

  const [StorageImageUrlArray, setUrlsGivenFromStorage] = useState([])

  const [addressError, setAddressError] = useState(null)

  const [jobTitleError, setjobTitleError] = useState(null)

  const [loading, setLoading] = useState(false)

  const [jobDescriptionError, setjobDescriptionError] = useState(null)

  const [state, setState] = useState("")

const [address,setAddress] = useState("");

const [category, setCategory] = useState("");

const [categoryError, setCategoryError] = useState(null)

const handleOnSelect = (item) => {
  (setCategory(item.name));
  setCategoryError(null)
  // console.log(item.name)
}





const [coordinates,setCoordinates] = useState({
  lat:null,
  lng:null,
})

const [error,setError] = useState(null)
 

const [gmapsLoaded, setGmapsLoaded] = useState(false)


//const [loading, setLoading] = useState(false)


var errors={};


//Add to Image Array Functions
  const addUrl = (newUrl) => {
    setURls(imagesUrlArray => [...imagesUrlArray, newUrl])
  }

  const addImage = (newImage) => {
    setImages(imagesArray => [...imagesArray, newImage])    
  }

const addStorageUrls = (url) => {
  setUrlsGivenFromStorage(StorageImageUrlArray => [...StorageImageUrlArray, url])
}




//Handle Change And Handle Select Functions
const handleChangeJobTitle = (e) => {
setJobTitle(e.target.value)
}
const handleChangeJobDescription = (e) => {
  setjobDescription(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    }
   
  

    const types =["image/png","image/jpeg"]

const handleChange = (e) => {

let selected = e.target.files[0]

// console.log("this is selected" + selected)

  if (selected && types.includes(selected.type)) {

setError(null)
   
    var selectedImageSrc = URL.createObjectURL(selected);

    addUrl(selectedImageSrc)
    addImage(selected)
    
   
  } else {
    setError("JPEG AND PNG IMAGES ONLY")
  }
};









const handleSelect = async value => {
  const results = await geocodeByAddress(value)

  //  console.log("this is results" + JSON.stringify(results))

   var filtered_array = results[0].address_components.filter(function(address_component){
    return address_component.types.includes("administrative_area_level_1");
}); 

var state = filtered_array.length ? filtered_array[0].long_name: "";

  const getLatitudeLongitude = await getLatLng(results[0])

  // console.log(getLatitudeLongitude)
  
  setState(state)
  setAddress(value)
  setCoordinates(getLatitudeLongitude)
  
  }







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




    const dispatch = useDispatch();



useEffect(() => {

  

  const token = localStorage.FBToken
if(token){
const decodedToken = jwtDecode(token);
if(decodedToken.exp * 1000 < Date.now()){
dispatch(logoutUser())
  window.location.href = '/login';
localStorage.clear();
} 
} else {
dispatch(logoutUser())
  window.location.href = '/login';
localStorage.clear();
}
/* eslint-disable */
}, [])








    const uploadData = () => {
    if (state !== "")
    {
     
      db.collection("JobPosts").doc(state).collection(category).add(userData)
.then(
        doc => {
          console.log("first doc id is: " +  doc.id)
          uploadDataToUsersJobPosts(doc.id);
        }
)
    } 
     }
    

     

    
    useEffect(() => {
console.log("use effect [StorageImageUrlArray] called inside postJobPostPage")
      if (StorageImageUrlArray.length !== [] ){
        // console.log("StorageImageUrlArray.length !== [] confirmed now will check if  StorageImageUrlArray.length === imagesUrlArray.length before uploading data")    
if (StorageImageUrlArray.length === imagesUrlArray.length ){
uploadData();
}
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [StorageImageUrlArray]);



    

//Helper Functions
const isEmpty = (string) => {

if (string === null) return true;

  if (string.trim() === '') return true;
  else return false;
};




const validateData = (data) => {
  
  errors = {}
 
  if (isEmpty(data.address)) {
    setAddressError("Address Must Not Be Empty")
    errors.jobAddress="job address empty"
  } 

  if (isEmpty(data.jobTitle)) {
    setjobTitleError("Job Title Must Not Be Empty")
    errors.jobTitle="job title must not be empty"
  } 

  if (isEmpty(data.jobDescription)) {
    setjobDescriptionError("Job Description Must Not Be Empty")
    errors.jobDescription = "Job Description Must Not Be Empty";
  } 

  if (isEmpty(data.category)) {
    setCategoryError("Category Must Not Be Empty")
    errors.category = "Category Must Not Be Empty";
  } 

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};



const setErrorValuesToNull = () => {
  setAddressError(null)
  setjobTitleError(null)
  setjobDescriptionError(null)
  setCategoryError(null)
}

const timestamp = String(dayjs())
const userData = {
  address: address,
  coordinates: coordinates,
  lat:coordinates.lat,
  lng:coordinates.lng,
  jobTitle: jobTitle,
  jobDescription: jobDescription,
  //createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  createdAt: timestamp,
  username: username,
  //images: StorageImageUrlArray,
  images: StorageImageUrlArray ? StorageImageUrlArray: ["https://upload.wikimedia.org/wikipedia/commons/8/84/Claw-hammer.jpg"],
  //email: email ,
  state: state,
  jobAdress: address,
  mainImage: StorageImageUrlArray[0] ? StorageImageUrlArray[0]: "https://upload.wikimedia.org/wikipedia/commons/8/84/Claw-hammer.jpg",
  category: category,
  userImageUrl: userImageUrl,
  jobPostOwnersUsername: username,
  jobOpen: true
}


//So, basically the idea is to skip the element at specific index and return the remaining items and set the state.
const handleRemove = (index) => {
  setImages(imagesArray.filter((x,i) => i !== index));
  setURls(imagesUrlArray.filter((x,i) => i !== index));
}







//Hanndle submit
const handleSubmit = () => {

  setLoading(true)

const { valid } = validateData(userData);
  if(!valid) {
   setLoading(false)
   return
  }

  setErrorValuesToNull();

if (!imagesArray.length) {
  console.log("!imagesArray.length was true calling upload data")
  uploadData()
  return 
}

  imagesArray.forEach(
    url =>
      {
        var imageName = MakeId(10);
        const uploadTask = storage.ref(`images/${imageName}.jpg`).put(url);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function 1%,2%...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress)
            // setProgress(progress);
          },
          (error) => {
            console.log("error this did not work" + error);
          },
          () => {
            // get download url and upload the post info
            storage
              .ref("images")
              .child(`${imageName}.jpg`)
              .getDownloadURL()
              .then(
(url  => {
                  addStorageUrls(url)
})

              );
          });
      }
  );
    }
  



    const history = useHistory();


 const uploadDataToUsersJobPosts = (docId) => {
  
  db.collection("users").doc(username).collection("MyJobPosts").doc(docId).set(userData)
  .then(
    () => {
setLoading(false)
 alert("Job Posted Successfully")
setNull()
history.push(`/users/${username}`);
    }
  )

 }








  const setNull  = () => {
 setJobTitle("")
 setjobDescription("")
 setURls([])
 setImages([])
 setState("")
 setCoordinates({})
}


  return (
    
    <div className="createPost">
     
        <div className="createPost__loggedIn">
          <h1 className="postJobP"> Post New Item</h1>



          <div className="UploadImageDiv" >
                <label >
                <input type="file" hidden  onChange={handleChange} />
                <span className="img-container"> 
                <img src='https://cdn.onlinewebfonts.com/svg/img_212908.png' alt="uploaded button "/>
                {imagesUrlArray.length < 1 && (
<div  >
<br></br>
Add An Image
</div>
)}
               </span>
                </label> 
                </div>


          


{error && <div style={{color:"red"}}>
  {error}
  </div>}
 
    
    

  <div className="img-grid">
{ imagesUrlArray && imagesUrlArray.map((url,index) => {


  return ( <div  key={index}
    className="img-wrap">
       {/* <span class="close">&times;</span> */}
       <button onClick={ () => handleRemove(index)} className="close">X</button>
       
<img src={url} alt="uploaded" 
  style={{objectFit: 'cover',   resizeMode: 'contain'}}
/>
        </div>
)
   }
)}
</div>



<TextField
    name="Title"
    type="text"
    label="Title"
    multiline
    rows="2"
    placeholder="Title"
    error={(jobTitleError ? true : false)}
    helperText={jobTitleError}
    className={"text_feild"}
    onChange={handleChangeJobTitle}
    fullWidth
     maxwidth="sm"
    >
    </TextField>
    <br/>
    <br/>
<br/>
    

{/* <p style={{color: "red"}}> { jobDescriptionError && (jobDescriptionError)}</p> */}
    <TextField
    name="Job Description "
    type="text"
    label="Job Description"
    multiline
    rows="6"
    placeholder="Job Description"
    error={jobDescriptionError ? true : false}
    helperText={jobDescriptionError}
    className={"text_feild"}
    onChange={handleChangeJobDescription}
    fullWidth
     maxwidth="xs"
    >
    </TextField>


    <TextField
    name="Contact Number"
    type="text"
    label="Contact Number"
    multiline
    rows="2"
    placeholder="Contact Number"
    //error={contactNumberError ? true : false}
    //helperText={contactNumberError}
    className={"text_feild"}
    // onChange={this.handleChange}
    fullWidth
     maxwidth="xs"
    >
    </TextField>

    <TextField
    name="Email"
    type="text"
    label="Email"
    value={email}
    multiline
    rows="2"
    placeholder={email}
    // error={emailError ? true : false}
    // helperText={emailError}
    className={"text_feild"}
    onChange={handleChangeEmail}
    fullWidth
     maxwidth="xs"
    >
    </TextField>

    {/* <p> latitude: {coordinates.lat}</p>
<p> longitude: {coordinates.lng}</p> */}
<p className="address"> Job Address: {address}</p>
<p className="address"> State: {state}</p>
<p style={{color: "red"}}> { addressError && (addressError)}</p>



{ gmapsLoaded && (
<PlacesAutocomplete
        fullWidth
        className="search-bar"
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}


    //     searchOptions={ {
    //       location: new google.maps.LatLng(-25, 134),
    //       radius: 2500000,
    //       types: ['address']
    // }} 

    searchOptions={ {
      //   location: new google.maps.LatLng(-25, 134),
      //   radius: 2500,
        types: ['(cities)'],
        componentRestrictions: {country: 'au'}
  }} 
       
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
         
          <div   >



            <input
            style={{width:"100%" }}
              {...getInputProps({
                placeholder: 'Enter Job Address',
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

            <div className="createPost__imagePreview">
              <img id="image-preview" alt="" />
            </div>
            
            <br>
</br>
<br>
</br>

<p style={{color: "red"}}> { categoryError && (categoryError)}</p>

<div className="App">
      <header className="App-header">
        <div 
        //style={{ width: 400 }}
        >
          <ReactSearchAutocomplete
           placeholder="Category"
            items={items}
            // onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            autoFocus
          />
        </div>
      </header>
    </div>

    <br>
</br>
<br>
</br>
<br>
</br>

         
<div className="UploadImageDiv">
          <Button 
           onClick={handleSubmit}
          type="submit" variant="contained" color="primary" 
className={"submit"}
//disabled={loading}
> 
Submit
</Button>
</div>




{loading && (
<div
style={{display: "flex",justifyContent: "center"}}
>
<CircularProgress
 style={{display: "flex",justifyContent: "center"}}
 />
 </div>
)}

<br>
</br>
<br>
</br>
<br>
</br>


        </div>
        <div>
        </div>
    
    </div>
  );
}

















