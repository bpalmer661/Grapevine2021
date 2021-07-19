
//all lesson 36



import React, { Component,Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//mui
import withStyles from '@material-ui/core/styles/withStyles';
import Muilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

//icons
import LocationOn from '@material-ui/icons/LocationOn';

import CalenderToday from '@material-ui/icons/CalendarToday';

import firebase from 'firebase/app';

import { connect } from 'react-redux';
import { ReportUser } from '../ReportUser';

// 

const styles = (theme) => ({
    ...theme.shared,
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
     
    },

    buttonsWrapper: {
        textAlign: 'center',
    },
   
    buttons: {
   
      color: '#fff',
      backgroundColor: '#3f50b5',
      border: 'black',
      margin: '10px',
      '& a': {
    
      }
    },   
  })


   

//const StaticProfile = (props) => {



export class StaticProfile extends Component {

  

  resetPassword = (email) =>{

    console.log("resest Password")

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset Password Email Sent To " +  email + " Please Check Junk Mail Also  hhhhhhhh ")
  

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorCode)
  
     
      this.setState({
          emailError: true,
          emailErrorText: `Error: ${errorMessage}`
      });
    });
  }


  // we need to work out why its not shwoing the persons contact number if it is in the database


  render() {
const { classes, profile: {
    createdAt,
    userImageUrl,
    email,
    username,
    services,
    servicesDescription,
    address,
    images,
    number,
    accountExpired,
},
} = this.props;


// user: state.user,
// data: state.data

const { credentials } = this.props.user;

const { authenticated } = this.props;


const reportUserMarkup = username !== credentials.username ? (
  <ReportUser
                openDialog={false}
                userBeingReported = {username}
                servicesDescription = {servicesDescription}
                mainImage = { userImageUrl}
                reportersUsername= {this.props.user.credentials.username}
/>
) : (
  null
)

const accountExpiredMarkup = accountExpired ? (
 <h1>Account Not Active - Reactivate In Settings</h1>
) : (
  null
)




const editProfileAndSettings = username === credentials.username ? (

<Fragment>
<Link 
className={"button"}
to={{ 
    pathname: '/EditProfilePage', 
    jobId: this.props.jobId,
    username: username,
    jobPostOwnersUsername: this.props.jobPostOwnersUsername,
    receiverId: this.props.receiverId,
    state: this.props.state,
    category: this.props.category,
    mainImage: this.props.mainImage,
    jobTitle: this.props.jobTitle,
    otherChatUser:this.props.jobPostOwnersUsername,
    images:this.props.images,
  }}
>
 <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    //  disabled={loading}
                    onClick={() => this.resetPassword(email)}
                       >Edit Profile Page </Button>
 </Link>



<Link 
className={"button"}
to={{ 
    pathname: '/SettingsPage', 
    jobId: this.props.jobId,
    username: username,
    jobPostOwnersUsername: this.props.jobPostOwnersUsername,
    receiverId: this.props.receiverId,
    state: this.props.state,
    category: this.props.category,
    mainImage: this.props.mainImage,
    jobTitle: this.props.jobTitle,
    otherChatUser:this.props.jobPostOwnersUsername,
    images:this.props.images,
  }}

>
 <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                 
                       >Settings</Button>
 </Link>
 

</Fragment>  

) : null





const result = services.map((o) => o.value);


return(
    <Paper 
    className={classes.paper}> 
    <div className={classes.profile}>
        <div className={"image-wrapper"}>
            <img className={"profile-image"} src={userImageUrl}  alt="profile"/>
          
          
        </div>
        <hr/>
      <div className="profile-details">
    <Muilink component={Link} to={`/users/${username}`} color="primary" variant="h5" >
    {username}
        </Muilink>
        <hr/>
        {accountExpiredMarkup}
        
        <hr/>

        <br/>
    <br/>        
        {address && (
    
            <Fragment>
           <LocationOn color="primary"/> <span> {address} </span>
           <hr/>
           </Fragment>
        )}

     

     
        <CalenderToday color="primary"/>{''}
         <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
    
    <br/>
    <br/>
    <br/>

    {email && <Typography variant="body2"> { email } </Typography>}
    <br/>
    
   

    
    <Typography variant="body2"> Contact Number: </Typography> {number && <Typography variant="body2"> { number } </Typography>}
     
     
    <br/>
    <br/>
         {services && <Typography variant="body2"> Services: { `${result}` } </Typography>}

         <br/>
    <br/>
         {services && <Typography variant="body2"> Services Description: { `${servicesDescription}` } </Typography>}

      </div>
    
    
      <div className="img-grid">
{ images && images.map((url,index) => {
return ( <div  key={index}
  className="img-wrap">
     {/* <span class="close">&times;</span> */}
     {/* <button onClick={ () => handleRemove(url,uname)} className="close">X</button> */}
<img 
style={{objectFit: 'cover',   resizeMode: 'contain'}}
src={url} alt="uploaded" />
      </div>
)
 }
)}


</div>



<br/>

<br/>

<br/>

{editProfileAndSettings}


    
    </div>

    
    {reportUserMarkup}


    <br/>
<br/>
<br/>
    </Paper>
)

}

}


StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  authenticated: state.user.authenticated,
});



 const mapActionsToProps = {
  //  logoutUser,
        // uploadImage
     }    


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(StaticProfile));
