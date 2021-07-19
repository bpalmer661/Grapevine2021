
import React, { Component } from 'react'
import DeleteJobPost from './DeleteJobPost'

//MUI 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Message from '@material-ui/icons/Message';

import { connect } from 'react-redux';

import { db } from "../../FirebaseConfig";
import UnfoldMore from '@material-ui/icons/UnfoldMore';

import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';


import MyButton from '../../util/MyButton'
import { getUserData } from '../../redux/actions/dataActions';

const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,
        // backgroundColor: "red",
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



  
 class JobPost extends Component {



    handleRepost = () => {

        const timestamp = String(dayjs())

        console.log("this is timestamp: " + timestamp)

       db.collection("JobPosts").doc(this.props.state).collection(this.props.category).doc(this.props.jobId).update({expired: false,createdAt: timestamp,})

db.collection("users").doc(this.props.user.credentials.username).collection("MyJobPosts").doc(this.props.jobId).update({expired: false,createdAt: timestamp,})

this.props.getUserData(this.props.user.credentials.username)
    }
    
    
    render() {


      dayjs.extend(relativeTime)
    
        const { classes, 
            
            jobPost : {
                createdAt,
            jobDescription,
            jobId, 
            jobTitle,
            username,
            category, 
            address,
            mainImage,
            userImageUrl,
        },
            user: {
                authenticated,
                credentials
            },
        } = this.props



    

        // console.log("this is jobPost: " + JSON.stringify(this.props.jobPost))

            const deleteButton = authenticated && username === credentials.username ? (
                <DeleteJobPost 
                jobPostId = {jobId}
                username= {credentials.username}
                refreshJobPosts = {this.props.refreshJobPosts} 
                // refreshJobPosts = {props.refreshJobPosts} 
                />
            ) : null
     

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
     
     


            const messageButton = username !== credentials.username ? (
               
                           <Link
to={{ 
  pathname: `/ChatPage/${this.props.jobPostOwnersUsername}`, 
  jobId: this.props.jobId,
  jobPostOwnersUsername: this.props.jobPostOwnersUsername,
  state: this.props.state,
  category: this.props.category,
  mainImage: this.props.mainImage,
  jobTitle: this.props.jobTitle,
  otherChatUser:this.props.jobPostOwnersUsername,

}}> 

                 <MyButton
                 tip="Message User"
                 >
                     <Message color="primary" />
                 </MyButton>
                 </Link>
                            ) : null












        return (

            
            <Card className={classes.card}
         style={ {backgroundColor: 
         this.props.expired ? "grey" : "white"} }
         > 
            
                <CardMedia
                image={mainImage}
                title="Profile Image"
                className={classes.image}
                
                />
              <CardContent className={classes.content}>
              <div className={classes.buttonContainer}>

              
              <img
src={userImageUrl}
alt = "Profile"
style={{height:"60px", width:"60px",
objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
}}
>
</img>



              <Typography ml={5} variant="h3" component={Link} to={`/users/${username}`} color="primary"
             className={classes.usernameTitle}
              >
              {username}
              </Typography>
             

              </div>
                <Typography variant="body2" color="textSecondary">
             {`Posted ` + dayjs(createdAt).fromNow()} 
             {/* {`- Posted By: ${jobPostOwnersUsername}`} */}
             </Typography>

              <br/>
            
              <Typography variant="h5">
              {jobTitle} 
              </Typography>
            
              <Typography
              color="textSecondary" >
              {jobDescription}
              </Typography>
              
              <Typography
        // color="textSecondary" 
        >
        {`${category} - ${address}`}
        </Typography>
        <Typography
        
        color="textSecondary" >
   
{/* if you don't put !! before it will show 0 instead when you want it to show nothing */}
        {  !!this.props.distanceAway && `${Math.round(this.props.distanceAway)} Kms away`} 
       
        <Typography
        // color="textSecondary" 
        >
        
        { this.props.expired&& ` JOB POST EXPIRED` }
        </Typography>
       
 
        </Typography>
              <br/>
              <div className={classes.buttonContainer}>
    { deleteButton }
    <br/>
 <br/>

 { editJobPostButton }


 { messageButton }
 

<Link 
to={{ 
    pathname: '/JobPostPage', 
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
 tip="Job Post Page"
 >
     <UnfoldMore color="primary" />
 </MyButton>
 </Link>



 { this.props.expired &&  
 <Button type="submit" 
 onClick={this.handleRepost}
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center"}}
                     className={classes.button}
                    //  disabled={loading}
                       >Repost</Button>
 }

<br/>
</div>
             </CardContent>
            </Card>
        
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    DeleteJobPost,
    getUserData,
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPost));


