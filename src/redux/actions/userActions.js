
import { SET_ALL_JOB_POSTS,SET_ERRORS, 
    CLEAR_ERRORS, LOADING_UI,
     SET_UNAUTHENTICATED,
     LOADING_USER, SET_AUTHENTICATED, SET_USER, MARK_NOTIFICATIONS_READ,
     STOP_LOADING_UI,
     SET_LOADING_FALSE,
     UPDATE_USER,
     UPDATE_USER_INFO,
     DEACTIVATE_ACCOUNT,
     ACTIVATE_ACCOUNT
    } from '../types'


    import firebase from 'firebase/app'


import axios from 'axios'
import 'firebase/firestore';
import { 
    db,
    //auth 
} from "../../FirebaseConfig";





export const setLoadingFalse = () => (dispatch) => {
    dispatch({type: STOP_LOADING_UI})
    }
    




export const loginUser = (user,history) => (dispatch) => {

dispatch({ type: LOADING_UI});
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/login',user)
.then(res => {

    setAuthorizationHeader(res.data.token)
    
dispatch(getUsersProfileData());
dispatch({type: CLEAR_ERRORS});
    history.push('/')
})
.catch(err => {
 
 dispatch({
     type:SET_ERRORS,
     payload: err.response.data,
 })
});
}




export const getUsersProfileData = () => (dispatch) => {
    console.log("getUsersProfileData Called")
dispatch({type: LOADING_USER});
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user`)
    .then(res => {
        dispatch({type: SET_AUTHENTICATED});
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    })
 .catch(err => console.log("you got an error" + err.code));
}








export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/image',formData)
    .then(() => {
      dispatch(getUsersProfileData())
    })
    .catch(err => console.log(err));
}


export const uploadJobPostImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/uploadJobPostImage',formData)
    .then(() => {
      dispatch(getUsersProfileData())
    })
    .catch(err => console.log(err));
}
 



export const getAllJobPosts = () => (dispatch) => {
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
   
    .then(res => {
        dispatch({
            type: SET_ALL_JOB_POSTS,
            
            payload: res.data
        })
    })
 .catch(err => console.log(err));
}







export const signUpUser = (user,history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    
        axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/signup',user)
    .then(res => {
    
        setAuthorizationHeader(res.data.token)

         
dispatch(getUsersProfileData());


    dispatch({type: CLEAR_ERRORS});
        history.push('/')
    })
    .catch(err => {
     dispatch({
         type:SET_ERRORS,
         payload: err.response.data,
     })
    });
    }




    export const logoutUser = () =>  (dispatch) => {



        console.log("logoutUser Called inside  userActions")
        localStorage.removeItem('FBToken')
        delete axios.defaults.headers.common["Authorization"];
        dispatch({type: SET_UNAUTHENTICATED })
        dispatch({type: SET_LOADING_FALSE })
        dispatch({type:  STOP_LOADING_UI})
        
        window.location.reload()
    }





    const setAuthorizationHeader = (token) => {
        const FBTOKEN = `${token}`
        localStorage.setItem('FBToken', FBTOKEN);
        axios.defaults.headers.common['Authorization'] = FBTOKEN
    }



export const editUserDetails = (userDetails) =>  (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user', userDetails)
    .then(() => {
        dispatch(getUsersProfileData());
    })
    .catch(err => console.log(err));
}



export const markNotificationsRead = () => dispatch => {
    console.log("markNotificationsRead called in userActions.js")
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/notifications')
    .then(res => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    })
    .catch(err => console.log(err));
}




export const setStoreServices = (services) =>  (dispatch) => {    
        dispatch({
            type:UPDATE_USER,
            payload: services,
        })
}





export const updateUserInfo = (userInfo) =>  (dispatch) => {
  console.log("updateUserInfo called")
        
    dispatch({
        type:UPDATE_USER_INFO,
        payload: userInfo,
    })

}




export const addImageToProfile = (formData) => (dispatch) => {

    console.log("dispatch({ type: LOADING_UI}); about to be called in addImageToProfile function inside userActions.js")    
    dispatch({ type: LOADING_UI});

    console.log("addImageToProfile called ")    
    
        axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/addImageToProfile/`,formData)
        .then(() => {
          dispatch(getUsersProfileData())
          dispatch({ type: STOP_LOADING_UI})
        })
        
        .catch(err => console.log(err));
    }
    
    
    
    export const deleteImageFromProfile = (url, username) => (dispatch) => {
    
        db.collection("users").doc(username).update({images: firebase.firestore.FieldValue.arrayRemove(url)})
        .then(() => {
            dispatch(getUsersProfileData())
        })
        .catch(err => console.log(err));
    }
    
    

    



    
    
       
    

    export const deactivateAccount = () =>  (dispatch) => {    
        dispatch({
            type: DEACTIVATE_ACCOUNT,
        })
}

export const activateAccount = () =>  (dispatch) => {    
    dispatch({
        type: ACTIVATE_ACCOUNT,
    })
}