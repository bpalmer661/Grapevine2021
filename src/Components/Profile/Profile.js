
import React, { Component,Fragment } from 'react';

import './Profile.css';

import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Edit from '@material-ui/icons/Edit';


//mui
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Muilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import MyButton from '../../util/MyButton'


//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';



//redux
import { connect } from 'react-redux';
import { uploadImage, logoutUser} from '../../redux/actions/userActions'
import { CircularProgress } from '@material-ui/core';



const styles = (theme) => ({
    ...theme.shared,
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
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
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
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






  

export class Profile extends Component {

state= {

}

handleImageChange = (event) => {
      const image = event.target.files[0];
     const formData = new FormData();
     formData.append('image', image, image.name);
     this.props.uploadImage(formData);
  };

handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click();
}


handleLogout = () => {
    this.props.logoutUser();
}



    render() {

        const {
            classes, 
           user: {
                credentials: {
                createdAt,
                userImageUrl,
                email,
                location,
                instagram,
                username,
            },
        
            loading,
            authenticated,
        },
        // data: {
        //   distanceAwayPreference,
        //   coordinates
        // }
    } = this.props;


 //const persistedState = localStorage.getItem("persistedState") 




let profileMarkup = authenticated ? (
<Paper 



className={classes.paper}
style={{position: "relative"}}
> 

{ loading && (
<CircularProgress/>
)
    }
 
    
<div className={classes.profile}
style={{position: "relative"}}
>

    <div className={"image-wrapper"}
    style={{position: "relative"}}
    >
        <img className={"profile-image"} src={userImageUrl}  alt="profile"/>
      
       
   <input 
   type="file"
    id="imageInput" 
    onChange={this.handleImageChange} 
    hidden="hidden"
    /> 


  <MyButton tip="Edit Profile Picture"
 onClick={this.handleEditPicture}
  className="button"
  >
<EditIcon color="primary" />
 </MyButton>



    </div>
    <hr/>
    
  <div className="profile-details"
  style={{position: "relative"}}
  >
<Fragment
>
 {/* eslint-disable-next-line */}
<Muilink 
component={Link} children=""
to={`/users/${username}`} color="primary" variant="h5" >
  <div></div>
{username}
    </Muilink>
    </Fragment>
    <hr/>
    {email && <Typography variant="body2"> email: { email } </Typography>}
    <hr/>
    {location && (
        <div>
       <LocationOn color="primary"/> <span> {location} </span>
       <hr/>
       </div>
    )}


    
     {instagram && (
        <div>
       <LinkIcon color="primary"/> 
       <a href={instagram} target="_blank" rel="noopener noreferrer" >
          {' '}{instagram}
       </a>
       <hr/>
       </div>


    )}
    <CalenderToday color="primary"/>{''}
     <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

  </div>


<div
style={{display:"flex", position:"relative"}}
>
  <Tooltip title="Log Out" placement="top">
<IconButton onClick={this.handleLogout} className="button"> 
<KeyboardReturn color="primary" />
</IconButton>
</Tooltip>



{/* this div is to keep the edit profile button to the right */}
            <div
            style={{width:"200px"}}
            > </div>
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
 <MyButton
 className={"button"}
 tip="Edit Profile"
 >
     <Edit color="primary" />
 </MyButton>
 </Link>
 </div>

</div>




</Paper>
) : (<Paper className={classes.paper}> 
<Typography variant="body2" align="center">
No Profile Found Please Login Again
</Typography>

<div className={classes.buttonsWrapper}> 
<Button className={classes.buttons} variant="contained"  component={Link} to="/login"> Login </Button>
<Button  className={classes.buttons} variant="contained"  component={Link} to="/signup"> SignUp </Button>


</div>



</Paper>)



        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
     user: state.user,
     data: state.data
});



    const mapActionsToProps = {
      logoutUser,
           uploadImage
        }    



Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));








