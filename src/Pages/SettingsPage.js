
//all lesson 36



import React, { Component } from 'react';

//mui
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import jwtDecode from 'jwt-decode';
import { db } from '../FirebaseConfig';
//icons

import firebase from 'firebase/app';

import { connect } from 'react-redux';

import { logoutUser,getUsersProfileData} from '../redux/actions/userActions'

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


   


export class SettingsPage extends Component {

  
  


    componentDidMount(){
       
       
  const token = localStorage.FBToken
  if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
   
  localStorage.clear();
  this.props.logoutUser()
  window.location.href = '/login';
}
  } else {
    localStorage.clear();
    this.props.logoutUser()
    window.location.href = '/login';
  }

    }


  resetPassword = (email) =>{

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset Password Email Sent To " +  email + "If Not Received Try Checking Junk Mail")
  

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


  DeleteAccount = (email) =>{

  console.log("Delete Account Called ")
  alert("Delete Account - Unable to process request pleast try again later")
  }

  
  

  provideFeedback = (email) =>{

    console.log("provideFeedback Called ")
    alert("Provide Feedback - Unable to process request pleast try again later")
    }
  

    

    pauseAccount = (email) =>{
      console.log("pauseAccount Called ")
      alert("Pause Account - Unable to process request pleast try again later")
      }



    aAccount = () => {
      console.log("reactivateAccount Called ")

      db.collection("users").doc(this.props.user.credentials.username).update({"accountExpired": false})
      db.collection(this.props.user.credentials.state).doc(this.props.user.credentials.username).update({"accountExpired": false})
     

      this.props.getUsersProfileData()

      }


      dAccount = () => {
        console.log("deactivateAccount Called ")
  
        db.collection("users").doc(this.props.user.credentials.username).update({"accountExpired": true})
        db.collection(this.props.user.credentials.state).doc(this.props.user.credentials.username).update({"accountExpired": true})
      
  
        
      this.props.getUsersProfileData()

        }
      





    
  render() {
const { classes 
} = this.props;



console.log("this.props.user.credentials.accountExpired is:  " + this.props.user.credentials.accountExpired)

let activateAccountMarkup = this.props.user.credentials.accountExpired ?  ( 
  
<div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.aAccount()}
                       >
                       ACTIVATE ACCOUNT
                        </Button>
</div>
  )  : (
    <div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.dAccount()}
                       >
                       DEACTIVATE ACCOUNT
                        </Button>
</div>
  )





return(
    <Paper 
    className={classes.paper}> 
    <div className={classes.profile}>
        <div className={"image-wrapper"}>
          <h1>SETTINGS PAGE </h1>
        </div>
        <hr/>
      <div className="profile-details">
  
  
</div>
<div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.resetPassword(this.props.user.credentials.email)}
                       >Reset Password </Button>

                       
</div>


<div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.provideFeedback(this.props.user.credentials.email)}
                       >Provide Feedback </Button>
</div>


<div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.provideFeedback(this.props.user.credentials.email)}
                       >Report Bug </Button>
</div>


<div className="profile-details">
<Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                     className={classes.button}
                    onClick={() => this.DeleteAccount(this.props.user.credentials.email)}
                       >Delete Account </Button>
</div>



{activateAccountMarkup}



    </div>
    


    
    </Paper>
)
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  authenticated: state.user.authenticated,
});



 const mapActionsToProps = {
   logoutUser,
   getUsersProfileData,
     }    
    


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(SettingsPage));


