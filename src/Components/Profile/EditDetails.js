
import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

//redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'


//mui
import withStyles from '@material-ui/core/styles/withStyles';
import { Tooltip, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

//icons
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
    ...theme.shared,
    button: {
        float: 'right'
    }
})

export class EditDetails extends Component {

state = {
    bio:"",
    website: "",
    service: "",
    location: "",
    open: false,
}

handleOpen = () => {
    this.setState({
        open: true
    })
    this.mapUserDetailsToState(this.props.credentials)
}

handleClose = () => {
    this.setState({
        open: false,
    })
    this.mapUserDetailsToState(this.props.credentials)
}

componentDidMount(){
const {credentials} = this.props;
this.mapUserDetailsToState(credentials)
}

mapUserDetailsToState = (credentials) => {
    this.setState({
        bio: credentials.bio ? credentials.bio : '',
        website: credentials.website ? credentials.website : '',
        service: credentials.service ? credentials.service : '',
        location: credentials.location ? credentials.location : '',
        
    });
};

onChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    });
}


handleSubmit = () => {
    const userDetails = {
        bio: this.state.bio,
        website: this.state.website,
        service: this.state.service,
        location: this.state.location,
    };

    this.props.editUserDetails(userDetails);
    this.handleClose();
}


    render() {

        const { classes } = this.props;

        return (

           <Fragment>
              
               <Tooltip title="edit details" placement="right">
             <IconButton onClick={this.handleOpen} className={classes.button}>
                 <EditIcon color="primary"> </EditIcon>
             </IconButton>
               </Tooltip>


<Dialog
open={this.state.open}
onClose={this.handleClose}
fullWidth
maxWidth = "sm"
>
    <DialogTitle> Edit Your Details </DialogTitle>
   <DialogContent> 
       <form>
           
  {/* service */}
  <TextField 
           name="service" 
           type="text"
           label="service"
           multiline
           rows="1"
           placeholder="Your service"
           className={classes.TextField}
           value={this.state.service}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>


           {/* bio */}
           <TextField 
           name="bio" 
           type="text"
           label="bio"
           multiline
           rows="1"
           placeholder="A Short Bio About Yourself"
           className={classes.TextField}
           value={this.state.bio}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>

           
          {/* website */}
           <TextField 
           name="website" 
           type="text"
           label="website"
           multiline
           rows="1"
           placeholder="Your Website"
           className={classes.TextField}
           value={this.state.website}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>

        
        
        
           

          {/* location */}
           <TextField 
           name="location" 
           type="text"
           label="location"
           multiline
           rows="1"
           placeholder="Your Location"
           className={classes.TextField}
           value={this.state.location}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>

          
           

       </form>

   </DialogContent>

<DialogActions>

    <Button
    onClick={this.handleClose}
    color="primary"
    >
        Close
    </Button>

    <Button
    onClick={this.handleSubmit}
    color="primary"
    >
        Save
    </Button>
</DialogActions>

</Dialog>

           </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    credentials: state.user.credentials
});


       EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
   classes: PropTypes.object.isRequired,  
}

export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails));


