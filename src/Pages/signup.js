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
import {signUpUser } from '../redux/actions/userActions';


import PropTypes from 'prop-types';



const styles = (theme) => ({
  ...theme.shared
    })
    





export class signup extends Component {

    //controlled component using state
    constructor(){
        super();
     this.state = {
         email: "",
         password:"",
         username:"",
         errors:  {},
     }

    }

    // eslint-disable-next-line
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
        this.setState({
            errors: nextProps.UI.errors
        })
    }
    

handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
        [event.target.name]:event.target.value
    });
}


handleSubmit = (event) => {
    event.preventDefault();
 this.setState({
     loading:true
 });

 const newUser = {
email: this.state.email,
password: this.state.password,
confirmPassword: this.state.confirmPassword,
username: this.state.username,
}


this.props.signUpUser(newUser,this.props.history);

}




    render() {


const { classes, UI: {loading} } = this.props

const { errors } = this.state


        return (
            
            <Grid className={classes.mainGrid}>
                
                <Grid item sm/>


                <Grid item sm>
                    <img 
                     style={{display: "flex",justifyContent: "center"}}
                    src={hammerLogo} alt="hammer" className={classes.image}/>

                    <Typography 
                      style={{display: "flex",justifyContent: "center"}}
                    variant="h3" className={classes.pageTitle}> 
                  Sign Up
                    </Typography>


                    <form noValidate onSubmit={this.handleSubmit}>
                    
                     <TextField id='email' 
                     name="email" 
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={errors.email}
                     error={errors.email ? true : false }
                     value={this.state.email}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />

                     <TextField id='password' 
                     name="password" 
                     type="password" 
                     label="Password" 
                     className={classes.textField}
                     helperText={errors.password}
                     //error seet field to be red
                     error={errors.password ? true : false }
                     value={this.state.password}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  

                        
                        <TextField id='confirmPassword' 
                     name="confirmPassword" 
                     type="password" 
                     label="Confirm Password" 
                     className={classes.textField}
                     helperText={errors.confirmPassword}
                     //error seet field to be red
                     error={errors.confirmPassword ? true : false }
                     value={this.state.confirmPassword}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  


<TextField id='username' 
                     name="username" 
                     type="text" 
                     label="Username" 
                     className={classes.textField}
                     helperText={errors.username}
                    
                     error={errors.username ? true : false }
                     value={this.state.username}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  
                       

                        {errors.general && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        style={{display: "flex",justifyContent: "center"}}
                        >
                    {errors.general}
                        </Typography>
                    )}


                    {errors.error && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        style={{display: "flex",justifyContent: "center"}}
                        >
                    {errors.error}
                        </Typography>
                    )}

                     <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     className={classes.button}
                     disabled={loading}
                     style={{display: "flex",justifyContent: "center"}}
                     
                       >Sign Up</Button>

 <br></br>
 <br></br>    
<small>  <Link 
 style={{display: "flex",justifyContent: "center"}}
to="/login" >already have an account? login</Link>  </small>
<br></br>
 <br></br>
{ loading && (
<div
style={{display: "flex",justifyContent: "center"}}
>
<CircularProgress
 style={{display: "flex",justifyContent: "center"}}
 />
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



signup.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser:PropTypes.func.isRequired,
}

//takes in global state
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signUpUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(signup));




