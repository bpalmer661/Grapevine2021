///user.js
///users.js
import React, { Component } from 'react'
import Proptypes from 'prop-types';
import axios from 'axios';
import JobPost from '../Components/Job Posts/JobPost'
import StaticProfile  from '../Components/Profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

import { Typography } from '@material-ui/core';



///////lesson 39////////
import Skeleton from '../util/Skeleton';
import UserProfileSkeleton from '../util/UserProfileSkeleton';
///////lesson 39////////

class user extends Component {


    state= {
        profile: null,
        jobPostIdParam: null,
    }



refreshJobPosts = (username) => {
    console.log("refresh job posts called in user.js")
    this.props.getUserData(username);
 
    

  }

 

    //this user profile page will be a static page and nothing will change on it 
    //so therefore we do not need to store it in the global state.
componentDidMount(){
    const username = this.props.match.params.username;


    //here we get check the url for the job id and if it matches we open that individual job
    const jobId = this.props.match.params.jobId;
    if (jobId) {
        this.setState({jobPostIdParam: jobId})
    }
  
    this.props.getUserData(username);
   
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/${username}`)
    .then(res => {

this.setState({
    profile: res.data.user
})
    })
    .catch(err => console.log(err))
}


    render() {


const { usersJobPosts, loading } = this.props.data;

const { credentials } = this.props.user


// const {  jobPosts } = this.props.user;



const titleMarkUp = usersJobPosts && usersJobPosts.length !== 0 ? (
    <Typography variant="h3"> {`${this.props.match.params.username}'s Job Posts`} </Typography>
    ) : (
        null
    )

const usersJobPostsMarkup = loading ? (
  
<Skeleton/>

) : usersJobPosts && usersJobPosts === null ? (
    <p> No Job Posts From This User </p>
) 
: 
( usersJobPosts &&  ( usersJobPosts.map(jobPost => {





if ( jobPost.username  !== credentials.username ){
    if ( jobPost.expired  === true ){
/* eslint-disable */
    return
    }
}

// we need to not show expired job post if current user is not = to the user who's profile page it is.

return <JobPost 
refreshJobPosts = {this.refreshJobPosts} index={jobPost.id}
key={jobPost.jobId} jobPost={jobPost} state={jobPost.state} category={jobPost.category} jobId={jobPost.jobId} expired={jobPost.expired}
jobPostOwnersUsername={jobPost.username}
mainImage={jobPost.mainImage}
jobTitle={jobPost.jobTitle}
/>

    })
)) 












        return (

           
            <div>


{this.state.profile === null ? (

    <UserProfileSkeleton/>

 ) : (
     <StaticProfile profile={this.state.profile} />
 )
 
}


<br/>
<br/>


{titleMarkUp}



<br/>
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
{usersJobPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    
                </Grid>
            </Grid>
            </div>
        )
   }
}

user.propTypes = {
    getUserData: Proptypes.func.isRequired,
    data: Proptypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})


const mapActionsToProps = {
    getUserData,
    
}


export default connect(mapStateToProps, mapActionsToProps)(user);

