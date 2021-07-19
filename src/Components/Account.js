
import React, { Component } from 'react'

//MUI 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


import { connect } from 'react-redux';
//import  JobPostDetails  from './JobPostDetails';

import UnfoldMore from '@material-ui/icons/UnfoldMore';

import Edit from '@material-ui/icons/Edit';


import MyButton from '../util/MyButton'

const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,
     
    },
    image:{
        minWidth:200,
        objectFit: 'cover'
    },
    content:{
        padding: 25,
        objectFit: 'cover',
        alignItems: 'centre',
    },
    buttonContainer:{
        display: "flex"
    },
    usernameTitle:{
        marginLeft: "10px"
    }
}





 class Account extends Component {

    render() {
      dayjs.extend(relativeTime)
    


// next we want to show the services that the person provides in the account component


        const { 
            accounts : {
            username,
            // services,
        },
        } = this.props.data


        const {
                authenticated,
                credentials,
        } = this.props.user
    
        const { classes } = this.props
     

     
          const result = this.props.services.map((o) => o.value);
       
            const editJobPostButton = authenticated && username === credentials.username ? (
               
<Link 
to={{ 
    pathname: '/EditJobPostPage', 
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
 tip="Edit Job Post"
 >
     <Edit color="primary" />
 </MyButton>
 </Link>
            ) : null
     
     


            
        return (

            
            <Card className={classes.card}>
                <CardMedia
                image={this.props.mainImage}
                title="Profile Image"
                className={classes.image}
                />
              <CardContent className={classes.content}>
              <div className={classes.buttonContainer}>

              
              <img
src={this.props.mainImage}
alt = "Profile"
style={{height:"60px", width:"60px",
objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
}}
>
</img>



              <Typography ml={5} variant="h3" component={Link} to={`/users/${this.props.username}`} color="primary"
             className={classes.usernameTitle}
              >
              {this.props.username}
            
              </Typography>
             

              </div>
                <Typography variant="body2" color="textSecondary">
             {`Account Created ` + dayjs(this.props.createdAt).fromNow()} 
             {/* {`- Posted By: ${jobPostOwnersUsername}`} */}
             </Typography>


            {/* <Typography variant="body2" color="textSecondary">
             {`this.props.lastLogin  ` + this.props.lastLogin }
             </Typography> */}



             
              <br/>
            
         
{/*             
              <Typography
              color="textSecondary" >
              {jobDescription}
              </Typography>
               */}

              <Typography
        // color="textSecondary" 
        >
        {`${this.props.address}`}
        </Typography>
        <Typography
        
        color="textSecondary" >


<Typography
        // color="textSecondary" 
        >



        {`${result}`}


        </Typography>

   

{/* if you don't put !! before it will show 0 instead when you want it to show nothing */}
        {  !!this.props.distanceAway && `${Math.round(this.props.distanceAway)} Kms away`} 
 
       
 
        </Typography>
              <br/>
              <div className={classes.buttonContainer}>
    
    <br/>
 <br/>

 { editJobPostButton }


 {/* { messageButton } */}
 

<Link 
to={{ 
    pathname: `/users/${this.props.username}`, 
    jobId: this.props.jobId,
    username: username,
    jobPostOwnersUsername: this.props.jobPostOwnersUsername,
    receiverId: this.props.receiverId,
    state: this.props.state,
    category: this.props.category,
    mainImage: this.props.mainImage,
    jobTitle: this.props.jobTitle,
    otherChatUser:this.props.jobPostOwnersUsername,
  }}

>
 <MyButton
 tip="Profile Page"
 >
     <UnfoldMore color="primary" />
 </MyButton>
 </Link>


<br/>
</div>
             </CardContent>
            </Card>
        
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    data:state.data
})

const mapActionsToProps = {
    // DeleteJobPost,
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Account));


