
//app.js
import React, { useEffect } from 'react';
import './App.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';

import AuthRoute from './util/AuthRoute'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './redux/store';
import { Provider } from "react-redux";
import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATED} from './redux/types'
import { logoutUser, getUsersProfileData } from './redux/actions/userActions'
import axios from 'axios'


import home from './Pages/home'
import login from './Pages/login'
import forgotPassword from './Pages/forgotPassword'
import signup from './Pages/signup'

import resetPassword from './Pages/resetPassword'

import SettingsPage from './Pages/SettingsPage'



import Navbar from './Components/layout/Navbar';
import user from './Pages/user';

import ChatPage from './Components/ChatPage';
import ConversationsPage from './Components/ConversationsPage';
import JobPostPage from './Components/Job Posts/JobPostPage'
import EditJobPostPage from './Components/Job Posts/EditJobPostsPage'
import EditProfilePage from './Components/EditProfilePage'
import FindPersonsHomePage from './Components/FindPersonsHomePage'

import ReportJobPost from './Components/ReportJobPost'



// import SearchPage from './Pages/SearchPage'
import GoogleMapsPage from './Pages/googleMapsPage';


 //import post
 import PostJobPostPage from './Pages/postJobPostPage';


const theme = createMuiTheme(themeFile);







function App() {

 // Similar to componentDidMount and componentDidUpdate:
 useEffect(() => {

  
  const token = localStorage.FBToken
if(token){
const decodedToken = jwtDecode(token);
if(decodedToken.exp * 1000 < Date.now()){

store.dispatch(logoutUser())
  window.location.href = '/login';

localStorage.clear();
} else {
   store.dispatch({type: SET_AUTHENTICATED})
  axios.defaults.headers.common['Authorization'] = token
  store.dispatch(getUsersProfileData());
}
} 


  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(position);
    },
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  );



  if ("geolocation" in navigator) {
    logCord();
  } else {
    console.log("Not Available");
  }
});



const logCord = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    
  });
}




  return (
<MuiThemeProvider theme={theme}>

<Provider store={store}>

  <Router>
    <Navbar className=".nav-container"/>
   <div className="container">
   <Switch>
       <Route exact path="/" component={home}/>
       <AuthRoute exact path="/login" component={login} 
        
        />
       <AuthRoute exact path="/signup" component={signup}
        />

        <Route exact path="/googleMapsPage" component={GoogleMapsPage}
        />


<Route exact path="/ChatPage/:otherChatUser" component={ChatPage}
        />

 <Route exact path="/PostJobPostPage" component={PostJobPostPage} /> 


<Route exact path="/users/:username" component={user}
        />

<Route exact path="/JobPostPage" component={JobPostPage}
        />

  <Route exact path="/EditJobPostPage" component={EditJobPostPage}
        />

<Route exact path="/ConversationsPage" component={ConversationsPage}/>

<Route exact path="/EditProfilePage" component={EditProfilePage}/>

<Route exact path="/FindPersonsHomePage" component={FindPersonsHomePage}/>


<Route exact path="/forgotPassword" component={forgotPassword}/>



<AuthRoute exact path="/resetPassword" component={resetPassword}/>


<Route exact path="/SettingsPage" component={SettingsPage}/>

<Route exact path="/ReportJobPost" component={ReportJobPost}/>





    </Switch>
   </div>
  </Router>
  


</Provider>



    
  </MuiThemeProvider>

  );
}


export default App;
