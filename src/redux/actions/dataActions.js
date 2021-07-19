
import { SET_ALL_JOB_POSTS, LOADING_DATA, SET_REPLYS_TO_JOB_POST,
    DELETE_JOB_POST,
     CLEAR_ERRORS, LOADING_UI, SET_JOB_POST,STOP_LOADING_UI, SET_DISTANCE_AWAY, SET_COORDINATES, 
     SET_SEARCH_CATEGORY,GET_REALTIME_USERS, GET_CONVERSATIONS, GET_MESSAGES,SET_ACCOUNTS,SET_USERS_JOB_POSTS,DELETE_CONVERSATION,
    } 
      from '../types'

      import firebase from 'firebase/app'



import axios from 'axios'
import { 
    db,
} from "../../FirebaseConfig";




//GET ALL JOB POSTS
export const getAllJobPosts = () => dispatch => {

    dispatch({ type: LOADING_DATA })
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
    .then(res => {
        dispatch({
            type: SET_ALL_JOB_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_ALL_JOB_POSTS,
            payload: []
        })
    })
}


//GET ALL SEARCH FILTERED JOB POSTS
export const getAllFilteredJobPosts = (criteria) => dispatch => {

    console.log(" getAllFilteredJobPosts called In Data Actions - this is criteria: " + JSON.stringify(criteria))

        dispatch({ type: LOADING_DATA })
        axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/FilteredJobPosts/${criteria.region}/${criteria.category}`)
        .then(res => {
            dispatch({
                type: SET_ALL_JOB_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ALL_JOB_POSTS,
                payload: []
            })
        })
    }


//DELETE A JOB POST
export const deleteJobPost = (jobId) => dispatch => {
    console.log("deleteJobPost called - this is jobPostId" + jobId)
    axios.delete(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPost/${jobId}`)
    .then(res => {
        dispatch({
            type: DELETE_JOB_POST,
            payload: jobId
        })
    })
    .catch(err => console.log(err));
}




export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}



export const getJobPost = (state,category,jobPostId) => dispatch => {
    dispatch({ type: LOADING_UI})

     console.log("get job post called in dataActions")
            
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPost/${state}/${category}/${jobPostId}`)
 .then(res => {
        dispatch({
            type: SET_JOB_POST,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => console.log("this is the err: " + err));
}









export const sendMessage = (jobPostDetails,jobPostId) => dispatch => {

console.log("In dataActions this is jobPostDetails: " + JSON.stringify(jobPostDetails) + " this is jobPostId: " + jobPostId)

    axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/Message/${jobPostId}`,jobPostDetails)
    .then(res => {
        dispatch({
            type: SET_REPLYS_TO_JOB_POST,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}


//////lesson 36////////
export const getUserData = (username) => dispatch => {

console.log("getUserData called this is username: " + username)

  dispatch({type: LOADING_DATA});
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/${username}`)
    .then(res => {
        dispatch({
            type: SET_USERS_JOB_POSTS,
            payload: res.data.jobPosts
        })
    })
    .catch(() => {
        dispatch({
            type: SET_USERS_JOB_POSTS,
            payload: null
        })
    })
}







export const PersonsOrJobs = (PersonsOrJobs) => (dispatch) => {
    
    dispatch({
        type: SET_DISTANCE_AWAY,
        payload: PersonsOrJobs
    })
}





export const setDistanceAway = (distanceAway) => (dispatch) => {
    
    dispatch({
        type: SET_DISTANCE_AWAY,
        payload: distanceAway
    })
}




/////lesson 43////////
export const setStoreCoordinates = (coordinates) => (dispatch) => {
    dispatch({
        type: SET_COORDINATES,
        payload: coordinates
    })
}


/////lesson 43////////
export const setSearchCategory= (category) => (dispatch) => {
    dispatch({
        type: SET_SEARCH_CATEGORY,
        payload: category
    })
}




/////chat page related below


export const getRealtimeUsers = (uid) => {


    return async (dispatch) => {

        dispatch({ type: `${GET_REALTIME_USERS}_REQUEST` });

        const unsubscribe = db.collection("users")
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !== uid){
                    users.push(doc.data());
                }
            });
           

            dispatch({ 
                type: `${GET_REALTIME_USERS}_SUCCESS`,
                payload: { users }
            });

        });

        return unsubscribe;

    }

}




export const getConversations = (username) => {

    return async (dispatch) => {

        console.log("this is username: " + username)
        
        const unsubscribe = db.collection("users").doc(username).collection("conversations").orderBy("createdAt", 'desc')
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
            const conversations = [];
            querySnapshot.forEach(function(doc) {
                    conversations.push(doc.data());
            });
         
            dispatch({ 
                type: GET_CONVERSATIONS,
                payload:  conversations 
            });
        });
        return unsubscribe;
    }
}




export const getMessages = (currentUser, jobId, otherChatUser) => {

console.log(" this is currentUser:   " + currentUser + "  this is jobId:   " +   jobId + "  this is otherChatUser:   " +  otherChatUser)


const convoId = `${otherChatUser}${jobId}`
    return async (dispatch) => {
        const unsubscribe =  db.collection('users').doc(currentUser).collection("conversations").doc(convoId).collection("messages").orderBy('createdAt','asc')
        .onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.forEach(function(doc) {
                    messages.push(doc.data());
            });
         
            dispatch({ 
                type: GET_MESSAGES,
                payload:  messages 
            });
        });
        return unsubscribe;
    }
}


    



export const addImageToJobPost = (formData, state, category, jobId) => (dispatch) => {
    // dispatch({type: LOADING_USER})

    console.log("addImageToJobPost called")


    console.log(" state: " + state + " category: " + category + " jobId: " + jobId )


    axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/addImageToJobPost/${state}/${category}/${jobId}`,formData)
    .then(() => {
      dispatch(getJobPost(state,category,jobId))
    })
    .catch(err => console.log(err));
}







export const deleteImageFromJobPost = (url,state,category,jobId,username) => (dispatch) => {

    db.collection("users").doc(username).collection("MyJobPosts").doc(jobId).update({images: firebase.firestore.FieldValue.arrayRemove(url)})

    db.collection("JobPosts").doc(state).collection(category).doc(jobId).update({images: firebase.firestore.FieldValue.arrayRemove(url)})
              
    .then(() => {
      dispatch(getJobPost(state,category,jobId))
    })
    .catch(err => console.log(err));
}






//GET ALL SEARCH FILTERED ACCOUNTS
export const getAccounts = (criteria) => dispatch => {

    console.log(" getAccounts called In userActions - this is criteria: " + JSON.stringify(criteria))

        dispatch({ type: LOADING_DATA })
        axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/getAccounts/${criteria.region}/${criteria.category}`)
        .then(res => {
            dispatch({
                type: SET_ACCOUNTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ACCOUNTS,
                payload: []
            })
        })
    }



    // may need to add other parameters to delete conversation.
  //DELETE A DeleteConversation //
  //conversation ID is the other chat users name and the jobId ,,  example jamesctZdj61LpSvHtAwsaFIT

export const deleteConversation = (conversationId,currentUserUsername) => dispatch => {


console.log("dataActions.js - delete conversation called with convo id of: " + conversationId + "  and currentUserUsername of: " + currentUserUsername)

    axios.delete(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/conversation/${conversationId}`)

    .then(res => {
        dispatch({
            type: DELETE_CONVERSATION,
            payload: conversationId
        })
    })
    .catch(err => console.log(err));
}