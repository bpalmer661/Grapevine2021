//home.js

//to do list 

//we want to have active accounts showned only if you have not used your account for 2 week it will go inactive, though you will
//get an warning email 2 days before this happen then also when it happens.

//  we  want notification for new jobs and also notifications for messages and 
// notifications when our jobs are about to expire and expire, 

//check for internet connection and if there is none, show it on the screen.

//we  want to limit job posts to 5 per user then if you want more you need to pay $1 per month - 
//set this up to gain coding experience

// and we want to verify email - requries the firebase auth code





import React, { Component } from 'react'
 import Grid from '@material-ui/core/Grid'
  import {getDistance} from 'geolib';
 
 import JobPost from '../Components/Job Posts/JobPost'
import Profile from '../Components/Profile/Profile'
import { connect } from 'react-redux';

//lesson 43 add getAllFilteredJobPosts
import { getAllJobPosts, getAllFilteredJobPosts } from '../redux/actions/dataActions';

import Skeleton from '../util/Skeleton';
import CompleteSearchBar from '../Components/SearchComponents/CompleteSearchBar';


import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { db } from '../FirebaseConfig';


export class home extends Component {

componentDidMount(){

    console.log("componentDidMount called in homepage.js")

    //this code is set up so the first user see's something when usign the site for the first time.
    const state = localStorage.getItem("persistedState")
    if (state == null){
    localStorage.setItem("persistedState","Victoria")
     localStorage.setItem("searchLat",-37.8136276)
     localStorage.setItem("searchLng",144.9630576)
     localStorage.setItem("address","Melbourne VIC, Australia")


const searchCriteria = {
    region: "Victoria",
    category: "Plumbing",
    kmsAway:20,
    }

    this.props.getAllFilteredJobPosts(searchCriteria);
    
}
}



searchFunction = (value) => {

    var searchCriteria = {
        region: localStorage.getItem("persistedState"),
        category:localStorage.getItem("persistedCategory"),
        kmsAway:localStorage.getItem("KmsAway")
        }

        const category = localStorage.getItem("persistedCategory")

        if (category === null){
            searchCriteria = {
                region: localStorage.getItem("persistedState"),
                category:"Plumbing",
                kmsAway:localStorage.getItem("KmsAway")
                }
        }
        this.props.getAllFilteredJobPosts(searchCriteria);
  }

 

    render() {

        dayjs.extend(relativeTime)
    
const { jobPosts, 
    loading,
     distanceAwayPreference,
} = this.props.data;


       let jobPostMarkup = !loading ? (

        jobPosts && jobPosts.map((jobPost) => {


const jobLat = jobPost.lat || 0
const jobLng = jobPost.lng || 0

const searchLat = localStorage.getItem("searchLat") || 0
const searchLng = localStorage.getItem("searchLng") || 0

var distanceInMeters =  getDistance(
    {latitude: searchLat, longitude: searchLng},
    {latitude: jobLat, longitude: jobLng},
  )

  if( distanceInMeters/1000 > distanceAwayPreference){
      return null
  }



const jobCreatedAT = jobPost.createdAt
const jobCreatedATDayjs = dayjs(jobCreatedAT)
const date2 = dayjs()
const difference = jobCreatedATDayjs.diff(date2, 'day', false)



if (difference < -30) {

//mark job as expired in database
db.collection("JobPosts").doc(jobPost.state).collection(jobPost.category).doc(jobPost.jobId).update({expired: true})
db.collection("users").doc(jobPost.jobPostOwnersUsername).collection("MyJobPosts").doc(jobPost.jobId).update({expired: true})

}  else {
    
}

// {`Posted ` + dayjs(1621934758436).fromNow()} 
//   if created at vs today date is greater than 30 , mark add as expired, then change getallfiltered post to , getjob valid (not expired)  = true , 
//   then show expired adds in users , jobs and when they click repost it , just changes the valid to true and sets a new created at date .



return(
     <JobPost key={jobPost.jobId} jobPost={jobPost} jobPostOwnersUsername={jobPost.jobPostOwnersUsername} distanceAway={distanceInMeters/1000}  jobId={jobPost.jobId}
     state={jobPost.state} category={jobPost.category} mainImage={jobPost.mainImage} jobTitle={jobPost.jobTitle}
/>
)
})
    ) : ( 
<Skeleton/> 
    )


    // if(Object.keys(jobPosts).length === 0) jobPostMarkup = "No Results Found";

        return (

            
<div>


<h1
style={{textAlign:"center"}}
>
Find  Jobs</h1>


<CompleteSearchBar 
searchFunction = {this.searchFunction} 
name="Sara"/>
<br/>
<br/>
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>

{jobPostMarkup}

                </Grid>
                <Grid item sm={4} xs={12}>
                    
                    <Profile/>
                   
                </Grid>
            </Grid>
            </div>
        )
    }
}


//takes in global state
const mapStateToProps = (state) => ({
    data: state.data,
})

const mapActionsToProps = {
    getAllJobPosts,
    getAllFilteredJobPosts
}

export default connect(mapStateToProps,mapActionsToProps)(home);






