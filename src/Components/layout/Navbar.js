
import React, { Component, Fragment } from 'react'


import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import MyButton from '../../util/MyButton'
import { logoutUser} from '../../redux/actions/userActions'

//////lesson 38/////////////
import Notifications from './Notifications.js'
//////lesson 38//////////////



//icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Gavel from '@material-ui/icons/Gavel';
import Message from '@material-ui/icons/Message';
import Person from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


///npm install @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';




export class Navbar extends Component {

    handleLogout = () => {
        console.log("handleLogout Called inside  Navbar")
        this.props.logoutUser();
    }

// add   settings and profile to navbar


    render() {

const { authenticated } = this.props
const { user } = this.props

        return (
            //AppBar defaults to position fixed
            <AppBar>
               <Toolbar className="nav-container">
{authenticated ? ( 

   <Fragment>


 {/* <PostJobPost/> */}


<Link to='/'>
 <MyButton
 tip="Find Jobs"
 >
<SearchIcon
/>
 </MyButton>
 </Link>



<Link to='/FindPersonsHomePage'>
 <MyButton
 tip="Find Tradesmen"
 >
<PeopleIcon
/>
 </MyButton>
 </Link>





 <Notifications/>




{/* lesson 42 */}
<Link to='/PostJobPostPage'>
 <MyButton
 tip="Post Job"
 >
<Gavel
/>
 </MyButton>
 </Link>



 <Link to='/ConversationsPage'>
 <MyButton
 tip="Messages"
 >
<Message
/>
 </MyButton>
 </Link>


 
 <Link to='/SettingsPage'>
 <MyButton
 tip="Settings"
 >
     <SettingsIcon color="primary" />
 </MyButton>
 </Link>
 

 <Link 
     to={`/users/${user.credentials.username}`} 
 >
 <MyButton
 tip="Profile Page"
 >
     <Person color="primary" />
 </MyButton>
 </Link>
 

 <Link to='/login'>
 <MyButton
 tip="Logout"
 onClick={this.handleLogout}
 >
     <KeyboardReturn color="primary" />
 </MyButton>
 </Link>

 

 

   </Fragment>

) : (

<Fragment> 
<Button color="inherit" component={Link} to="/FindPersonsHomePage"> Find People</Button>
<Button color="inherit" component={Link} to="/"> Find Jobs</Button>
<Button color="inherit" component={Link} to="/login"> Login</Button>
<Button color="inherit" component={Link} to="/signup"> SignUp</Button>





</Fragment> 

) }
               </Toolbar>   
            </AppBar>
        )
    }
}



Navbar.propTypes = {
    authenticated: Proptypes.bool.isRequired,
    logoutUser: Proptypes.func.isRequired,
}


const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    user: state.user
})

export default connect(mapStateToProps,{logoutUser})(Navbar)
