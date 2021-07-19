
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

import  JobPostDetails  from '../Components/Job Posts/JobPostDetails';


// import { getJobPost } from '../../redux/actions/dataActions'
import { getJobPost } from '../redux/actions/dataActions'


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
        objectFit: 'cover'
    },
    buttonContainer:{
        display: "flex"
    }
}







 class ChatRoomHeader extends Component {

    
componentDidMount(){

    console.log("in ChatRoomHeader : " + this.props.state,this.props.category,this.props.jobId)

    this.props.getJobPost(this.props.state,this.props.category,this.props.jobId);

    //fetch

}



    render() {

       
      dayjs.extend(relativeTime)
    
        const { classes, 
            




            jobPost : {
                createdAt,
            jobTitle,
            username,
            category, 
            address,
            mainImage,
            jobPostOwnersUsername,
            userImageUrl,
        },
           
        } = this.props


            
     
        return (

            <Card className={classes.card}>
                <CardMedia
                image={mainImage}
                title="Profile Image"
                className={classes.image}
                />

              <CardContent className={classes.content}>


              <img
src={userImageUrl}
alt = "Profile"
style={{height:"40px", width:"40px",
objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        padding: '1px'
}}
>
</img>
              <Typography variant="h5" component={Link} to={`/users/${username}`} color="primary">
              {username}
              </Typography>

              {/* npm i dayjs */}
              <Typography variant="body2" color="textSecondary">
             
              {dayjs(createdAt).fromNow()} {`- Posted By: ${jobPostOwnersUsername}`}
              </Typography>

           
              <br/>


              <Typography variant="h5">
              {jobTitle} 
              </Typography>
            
              <Typography
        
        color="textSecondary" >
        {`${category} - ${address}`}
        </Typography>
        <Typography
        
        color="textSecondary" >
   



        </Typography>
              <br/>
              
              <div className={classes.buttonContainer}>
  
<JobPostDetails jobId={this.props.jobId} username={username} openDialog={this.props.openDialog}
 jobPostOwnersUsername = {this.props.jobPostOwnersUsername}  receiverId = {this.props.receiverId} 
 state={this.props.state} category={this.props.category} mainImage = { this.props.mainImage}
/>

</div>


             </CardContent>

            </Card>
        
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.user,
    jobPost: state.data.jobPost,
})

const mapActionsToProps = {
    getJobPost
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ChatRoomHeader));


