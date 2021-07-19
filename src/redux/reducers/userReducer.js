///////lesson 38 add MARK_NOTIFICATIONS_READ//////////////
// import { ClickAwayListener } from '@material-ui/core';
import {  SET_AUTHENTICATED,SET_UNAUTHENTICATED,SET_ALL_JOB_POSTS, LOADING_USER,SET_USER,GET_REALTIME_MESSAGES,
     MARK_NOTIFICATIONS_READ, GET_REALTIME_CONVERSATIONS, UPDATE_USER, UPDATE_USER_INFO, SET_LOADING_FALSE ,DEACTIVATE_ACCOUNT,ACTIVATE_ACCOUNT
    } from '../types'
///////lesson 38 //////////////

const initialState = {
authenticated: false,
loading: false,
credentials: {},
jobPosts:[],
usersJobs:[],
};

export default function userReducer(state = initialState,action) {

    switch(action.type){
        case SET_AUTHENTICATED:
  
            return {
                ...state,
                authenticated: true
            };

            case SET_UNAUTHENTICATED:
                console.log("set unauthenticated called")
                return initialState;

                case SET_ALL_JOB_POSTS:
                    return{
                        ...state,
                        jobPosts: action.payload
                    };

                        case LOADING_USER:
                            return{
                                ...state,
                                loading: true
                            };
   

    case SET_USER:
        // console.log("this is set user action. payload: " + JSON.stringify(action.payload))
        return{
            
            authenticated: true,
            loading: false,
          ...action.payload,
        };

       
        case  GET_REALTIME_CONVERSATIONS:
        return{
            authenticated: true,
            loading: false,
          ...action.payload,
        };
        


case GET_REALTIME_MESSAGES:
    console.log("in userReducer, this is messages  action.payload: " + action.payload)
    return {
        ...state,
        messages: action.payload
    };
    
    


case MARK_NOTIFICATIONS_READ:
state.notifications.forEach(not => not.read = true)
return {
...state
};



case UPDATE_USER:
    return{
        authenticated: true,
        loading: false,
        credentials: action.payload,
    };



    case UPDATE_USER_INFO:
    return{
        
        authenticated: true,
        loading: false,
        credentials: action.payload,

    };
 

    case  SET_LOADING_FALSE:
        return{
            authenticated: false,
            loading: false,
            credentials: {},
jobPosts:[],
usersJobs:[],
        };




case DEACTIVATE_ACCOUNT:
    return{
        ...state,
        authenticated: true,
        loading: false,
        accountExpired: true,
    };
        


case ACTIVATE_ACCOUNT:
    return{
        ...state,
        authenticated: true,
        loading: false,
        accountExpired: false,
    };
        



                    default:
                        return state;
    }
}




