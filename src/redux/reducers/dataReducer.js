
import { SET_ALL_JOB_POSTS, LOADING_DATA,DELETE_JOB_POST,POST_JOB_POST, SET_JOB_POST,SET_DISTANCE_AWAY,SET_STATE, SET_COORDINATES,
    SET_SEARCH_CATEGORY,GET_CONVERSATIONS, GET_MESSAGES, SET_ACCOUNTS,SET_USERS_JOB_POSTS,
} from '../types'

const initialState= {
    jobPosts: [],
    jobPost: [],
    jobPostReplys: [],
    loading: false,
};



export default function dataReducer(state = initialState, action){


    switch(action.type){
    
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
            
            case SET_ALL_JOB_POSTS:
                console.log(" SET_ALL_JOB_POSTS called  in dataReducer")
                //console.log(" SET_ALL_JOB_POSTS called  in dataReducer- this is action.payload: " + JSON.stringify(action.payload))
                return{
                    ...state,
                    jobPosts: action.payload,
                    loading: false,
                }


                case SET_USERS_JOB_POSTS: 
                return{
                    ...state,
                    usersJobPosts: action.payload,
                    loading: false,
                }



                



    case DELETE_JOB_POST: 
let index = state.jobPosts.findIndex((jobPost) => jobPost.jobId === action.payload) 
console.log("this is action.payload in DELETE_JOB_POST in dataReducer - which should be jobID of:  " + action.payload)

console.log("this is index: " + index)

state.jobPosts.splice(index, 1);

window.location.reload()
return{ 
    ...state

}


case POST_JOB_POST: 

return {
    ...state,
    jobPosts: [
        action.payload,
        ...state.jobPosts
    ]
};


case SET_JOB_POST:
return {
    ...state,
  jobPost: action.payload
};



case SET_DISTANCE_AWAY:
return {
    ...state,
  distanceAwayPreference: action.payload
};



case SET_STATE:
return {
    ...state,
//   state: action.payload
};

case SET_COORDINATES:
return {
    ...state,
  coordinates: action.payload
};


case SET_SEARCH_CATEGORY:
return {
    ...state,
  category: action.payload
};







case GET_CONVERSATIONS:
return {
    ...state,
  conversations: action.payload
};




case GET_MESSAGES:
return {
    ...state,
  messages: action.payload
};




case SET_ACCOUNTS:
    return{
        ...state,
        accounts: action.payload
    };









                default:
                    return state;
    }
    }