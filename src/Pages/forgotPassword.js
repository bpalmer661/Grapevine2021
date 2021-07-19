import React, { Component } from 'react'

import hammerLogo from '../Images/hammerlogo.png'
import { Link } from 'react-router-dom';

//MUI 
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';




import { connect } from 'react-redux';
import {setLoadingFalse } from '../redux/actions/userActions';
import firebase from 'firebase/app';


const styles = (theme) => ({
    ...theme.shared
      })
      
  


export class forgotPassword extends Component {

    constructor(){
        super();
     this.state = {
         email: "",
         password:"",
         username:"",
         errors:  {},
         emailError: false,
         emailErrorText: "",
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


    this.setState({
        emailError: false,
        emailErrorText: null,
    });


 
const email = this.state.email


if (!email){
    this.setState({
        emailError: true,
        emailErrorText: `Please Enter An Email`,
    });
return
}


 firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    alert("Reset Password Email Sent To " +  email + " Please Check Junk Mail Also llllll")



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

const {errors } = this.state


        return (
            
            <Grid className={classes.mainGrid}>
                
                <Grid item sm/>

                <Grid item sm>
                    <img src={hammerLogo} alt="hammer" 

                    className={classes.image}
                   
                    //style={{display: "flex", marginTop:"100px", height:"10vh",width:"8vw"}}

                    style={{display: "flex", marginTop:"100px"}}
                    />

                    <Typography 
                    //  style={{display: "flex",justifyContent: "center"}}
                     style={{display: "flex",justifyContent: "center",fontSize:"3vw"}}
                    // variant="h3" 
                    className={classes.pageTitle}> 
                  Reset Password
                    </Typography>

                  

                    <form noValidate onSubmit={this.handleSubmit}>
                    
                     <TextField id='email' 
                     name="email" 
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={this.state.emailErrorText}
                     error={this.state.emailError ? true : false }
                     value={this.state.email}
                     onChange={this.handleChange}
                     fullWidth

                     />
   
                        
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
                    )}

                     <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                    
                     style={{display: "flex",justifyContent: "center",fontSize:"2.5vh", width: "15vw", height: "5vh"}}
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
            
        


 



                   
 <br></br>
 <br></br>    
<small>  <Link to="/login"
 style={{display: "flex",justifyContent: "center"}}
>Back To Login Page</Link>  </small>
<br/>
<br></br>
 <br></br>
{ loading && (
<div style={{display: "flex",justifyContent: "center", alignContent:"center"}}>
<CircularProgress/>

</div>

)
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

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(forgotPassword));



