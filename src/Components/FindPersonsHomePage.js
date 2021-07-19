

import React, { Component } from 'react'
 import Grid from '@material-ui/core/Grid'
  import {getDistance} from 'geolib';
 
import Profile from '../Components/Profile/Profile'
import { connect } from 'react-redux';

//lesson 43 add getAllFilteredJobPosts
import { getAccounts } from '../redux/actions/dataActions';

import CompleteSearchBar from '../Components/SearchComponents/CompleteSearchBar';
import Account from '../Components/Account'
import { db } from '../FirebaseConfig';

import dayjs from 'dayjs'



const checkAndSetAccountToExpired = (account) => {
    const lastloginDayjs = dayjs(account.lastLogin)

    const date2 = dayjs()
    
    const difference = lastloginDayjs.diff(date2, 'day', false)
    
    if (account.username === "jimmy"){
        console.log("lastloginDayjs: " + lastloginDayjs)
        console.log("date2: " + date2)
    console.log("this is difference: " + difference )
    }
    

    // bpx to do here check if difference is above 20 days and if so send email saying account will expire,
    
    if (difference < -30) {
    //mark job as expired in database
    db.collection("users").doc(account.username).update({"accountExpired": true})
    db.collection(account.state).doc(account.username).update({"accountExpired": true})
    }  

   //bpx to do here also send email saying account has expired.
    
}



export class FindPersonsHomePage extends Component {

componentDidMount(){

console.log("componentDidMount call inside FindPersonsHomePage.js")

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
    this.props.getAccounts(searchCriteria);
} else {

const searchCriteria = {
    region: "Victoria",
    category: "Plumbing",
    kmsAway:20,
    }

    this.props.getAccounts(searchCriteria);
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
console.log("category was null")
            searchCriteria = {
                region: localStorage.getItem("persistedState"),
                category:"Plumbing",
                kmsAway:localStorage.getItem("KmsAway")
                }
        }
        this.props.getAccounts(searchCriteria);
  }



 

    render() {

       
const { accounts, 
        loading,
         distanceAwayPreference,
    } = this.props.data;


       let jobPostMarkup = loading ? (

    //  jobPosts.map((jobPost) => {

    
        accounts && accounts.map((account) => {

            checkAndSetAccountToExpired(account)


            //bpx - eventually move so we filter out expired account before this stage , either through deleting the account or not fetching it
            //  see if account has expired and not show it 
            if(account.accountExpired && true){
                console.log(`${account.username} is expired `)
                return
            }

        
const accountLat = account.coordinates.lat || 0
const accountLng = account.coordinates.lng || 0


const searchLat = localStorage.getItem("searchLat") || 0
const searchLng = localStorage.getItem("searchLng") || 0



var distanceInMeters =  getDistance(
    {latitude: searchLat, longitude: searchLng},
    {latitude: accountLat, longitude: accountLng},
  )

  if( distanceInMeters/1000 > distanceAwayPreference){
      return null
  }
        

return(
     <Account key={account.username}
      distanceAway={distanceInMeters/1000}  
     state={account.state} 
      mainImage={account.userImageUrl} 

      address={account.address}


      services={account.services}
      createdAt={account.createdAt}
      username={account.username}
      lastLogin={account.lastLogin}
/>
)
})
    ) : ( 
        <h1> YER BOI</h1>
    ) 

    // if(Object.keys(accounts).length === 0) jobPostMarkup = "No Results Found";
    
   
        return (
<div>

<h1
style={{textAlign:"center"}}
>
Find Trade & Service Workers</h1>

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
    getAccounts,
}

export default connect(mapStateToProps,mapActionsToProps)(FindPersonsHomePage);

