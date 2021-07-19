

import store from '../redux/store';
import jwtDecode from 'jwt-decode'
import { logoutUser } from '../redux/actions/userActions'
import { connect } from 'react-redux';




const tokenCheck = localStorage.FBToken
if(tokenCheck){
   

  console.log("checking for token.......")
const decodedToken = jwtDecode(tokenCheck);


//if token expired log out user and set to un authenticated.
if(decodedToken.exp * 1000 < Date.now()){
    console.log("token expired logging out user")
store.dispatch(logoutUser())
  window.location.href = '/login';
localStorage.clear();
} 



//no token - log out user and set to un authenticated.
} else {
    console.log("no token found")
    store.dispatch(logoutUser())
  window.location.href = '/login';
}

const mapStateToProps = (state) => ({ authenticated: state.user.authenticated })





export default connect(mapStateToProps)(tokenCheck);
