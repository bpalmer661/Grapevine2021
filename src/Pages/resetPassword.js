
//resetPassword.js

import React, { Component } from 'react'

import hammerLogo from '../Images/hammerlogo.png'


//MUI 
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {setLoadingFalse } from '../redux/actions/userActions';

import firebase from 'firebase/app';


const styles = (theme) => ({
    ...theme.shared
      })
      
  


export class resetPassword extends Component {
    

    constructor(){
        super();
     this.state = {
         email: "",
         password:"",
         confirmPassword:"",
         username:"",
         errors:  {},
         passwordError: false,
         passwordErrorText: "",
     }

    }

    componentDidMount(){
        console.log("componentDidMount called inside login page")






    }
    

    // eslint-disable-next-line
componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors)
    this.setState({
        errors: nextProps.UI.errors
    })
}


handleSubmit = (event) => {
    event.preventDefault();


console.log("handle Submit called in resetPassword.js")

firebase.auth().sendPasswordResetEmail(this.props.user.credentials.email)
.then(() => {
  alert("Reset Password Email Sent To " +  this.props.user.credentials.email + " Please Check Junk Mail Also ")



})
.catch((error) => {
//   var errorCode = error.code;
  var errorMessage = error.message;
  // ..
//   console.log(errorCode)
alert(`Error ${errorMessage}`)
 
})
}



handleChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    });
}



handleCancel = () => {
    console.log("handle cancel called")
   this.props.setLoadingFalse()
}






    render() {

const { classes, 
    UI: 
   {loading}
 } 
= this.props


const  { email } = this.props.user.credentials


        return (
            
            <Grid className={classes.mainGrid}>
                
                <Grid item sm/>

                <Grid item sm>
                    <img src={hammerLogo} alt="hammer" 
                    className={classes.image}

                    //style="display: flex; padding: 20px 0px 0px 0px;"
                    style={{display: "flex", marginTop:"100px"}}
                    />

                    <Typography 
                    //  style={{display: "flex",justifyContent: "center",fontSize:"555px", color:"red", backgroundColor:"blue"}}
                    style={{display: "flex",justifyContent: "center"}}
                    // variant="h5" 
                    className={classes.pageTitle}> 
                  Reset Password 
                    </Typography>


                    <Typography 
                     style={{display: "flex",justifyContent: "center"}}
                    variant="h5" 
                    className={classes.pageTitle}> 
                  {email}
                    </Typography>

                  

                    <form noValidate onSubmit={this.handleSubmit}>


                    {/* <TextField id='password' 
                     name="password" 
                     type="password" 
                     label="Password" 
                     className={classes.textField}
                     helperText={this.state.passwordErrorText}
                     //error seet field to be red
                     error={this.state.passwordError? true : false }
                     value={this.state.password}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />   */}

{/* 
passwordError: true,
    passwordErrorText: "Passwords Don't Match ", */}



                        
                        {/* <TextField id='confirmPassword' 
                     name="confirmPassword" 
                     type="password" 
                     label="Confirm Password" 
                     className={classes.textField}
                     helperText={this.state.passwordErrorText}
                     error={this.state.passwordError? true : false }
                     value={this.state.confirmPassword}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />   */}

                    
{/*                   
   
                        
                        {errors.general && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        >
                    {errors.general}
                        </Typography>
                    )}


                    {errors.error && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        >
                    {errors.error}
                        </Typography>
                    )} */}

                     <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center"}}
                     className={classes.button}
                     disabled={loading}
                       >Reset</Button>






{loading
    ? <Button 
    onClick={ this.handleCancel}
                    variant="contained"  
                    color="primary"  
                    style={{display: "flex",justifyContent: "center", marginTop: "-0.5px"}}
                    className={classes.button}
                      >Cancel</Button>
    : null
  }
            
        


 



                   
 

                    </form>
                </Grid>
                <Grid item sm/>
             
            </Grid>
        )
    }
}



//takes in global state
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    
    setLoadingFalse,
    
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(resetPassword));



