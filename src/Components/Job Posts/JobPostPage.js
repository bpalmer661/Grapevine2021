//JobPostPage.js
import React, { Component , Fragment , link} from 'react'
import DeleteJobPost from './DeleteJobPost'

//MUI 
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


import { connect } from 'react-redux';

import { getJobPost, deleteJobPost } from '../../redux/actions/dataActions'



import IconButton from '@material-ui/core/IconButton';
import Message from '@material-ui/icons/Message';

import { Link } from 'react-router-dom';



import { DialogContent } from '@material-ui/core';
import Modal from '../Modal'
import { ReportJobPost } from '../ReportJobPost';



const styles = (theme) => ({
    
    ...theme.shared,
    
    invisibleSeparartor: {
            border: 'none',
            margin: 4,
            backgroundColor: "red",
        },
        expandButton: {
            top: '0%', 
        },
        closeButton:{
    width: 50,
    position: "absolute",
    left: "90%",
    top: "1%"
        },
        
        jobImageUrl: {
            marginTop: 50,
            alignContent: "center",
            width: 900,
            // height: 250,
            objectFit: 'fit',
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "2px",
            border: "black"
            
        },
    
    
        userImageUrl: {
            marginTop: 50,
            alignContent: "center",
            width: 150,
            height: 150,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: '50%',
            border: "black",
            objectFit: 'cover',  
             resizeMode: 'contain',
        },
    
        jobPhotos: {
            alignContent: "center",
            border:"none",
            maxwidth: 100,
            height: 100,
            objectFit: 'cover',
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
        },
    
        DialogContent:{
        },
       
    
        username:{
            maxWidth: 3500,
            paddingTop: 5,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",  
        },
    
        visibleSeparator:{
            width:'100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20,
        }
    })    


 class JobPostPage extends Component {

    state = {
        open: false,
        oldPath: "",
        newPath:"",
        selectedImg:null,
        disabled: false,
    }
    

componentDidMount(){

    console.log("this.props.jobPostOwnersUsername :" + this.props.location.jobPostOwnersUsername)  
    this.props.getJobPost(this.props.location.state,this.props.location.category,this.props.location.jobId);
}

    render() {

    

        // console.log("jobPost,js this is this.props.jobPostOwnersUsername: " + this.props.jobPostOwnersUsername)

      dayjs.extend(relativeTime)
    
        const { classes, 
            
            jobPost : {
                createdAt,
            jobDescription,
            jobId, 
            jobTitle,
            username,
            category, 
            mainImage,
            userImageUrl,
            images,
            state,
        },
            user: {
                authenticated,
                credentials
            },
        } = this.props


        // console.log("this is jobPost: " + JSON.stringify(this.props.jobPost))

            const deleteButton = authenticated && username === credentials.username ? (
                <DeleteJobPost jobPostId =
                {jobId}/>
            ) : null

            // const reportButton = authenticated && username !== credentials.username ? (
            //     <DeleteJobPost jobPostId =
            //     {jobId}/>
            // ) : null
     
     
            


            const reportButton  =  this.props.location.jobPostOwnersUsername !== credentials.username ? (

                // jobId: this.props.location.jobId,
                // jobPostOwnersUsername: this.props.location.jobPostOwnersUsername,
                // state: this.props.location.state,
                // category: this.props.location.category,
                // mainImage: this.props.location.mainImage,
                // jobTitle: this.props.location.jobTitle,
                // otherChatUser:this.props.location.otherChatUser,


                <ReportJobPost 
                jobId={this.props.location.jobId} 
                openDialog={false}
                // openDialog={this.props.openDialog}
                jobPostOwnersUsername = {this.props.location.jobPostOwnersUsername}
                  receiverId = {this.props.receiverId} 
                state={this.props.location.state} 
                category={this.props.location.category} 
                mainImage = { this.props.location.mainImage}
                jobDescription = {this.props.location.jobDescription}
                jobTitle = {jobTitle}
                username= {credentials.username}
               />

                
                ) : null



const replyButton  =  this.props.location.jobPostOwnersUsername !== credentials.username ? (

    <Link
    to={{ 
      pathname: `/ChatPage/${this.props.location.jobPostOwnersUsername}`, 
      jobId: this.props.location.jobId,
      jobPostOwnersUsername: this.props.location.jobPostOwnersUsername,
      state: this.props.location.state,
      category: this.props.location.category,
      mainImage: this.props.location.mainImage,
      jobTitle: this.props.location.jobTitle,
      otherChatUser:this.props.location.otherChatUser,
    }}> 
    
      <IconButton onClick={this.handleOpen} >
    <Message color="primary"> </Message>
    </IconButton>
     </Link>
    
    
    
    ) : null
    
    
        return (
            <Fragment >


<DialogContent 
className={classes.DialogContent}
>


<div >
<img
src={mainImage}
alt = "Profile"
className={classes.jobImageUrl}
>
</img>
<br/>



<img
src={userImageUrl}
alt = "Profile"
className={classes.userImageUrl}
>
</img>
<br/>


<Typography
// style={{backgroundColor: "grey", borderRadius: '2%',}}
className={classes.username}
component={link}
color="primary"
variant="h4"
to={`/users/${username}`}
>
    {username}
</Typography>  






<br/>
<hr 
className={classes.invisibleSeparartor}
/>

<Typography variant="body2" color="textSecondary" >
    
{`Job Posted: ${dayjs(createdAt).fromNow()}`}

</Typography>


<hr 
className={classes.invisibleSeparartor}
/>


    
     <Typography
className={classes.jobDescription}
variant="body1"
>
 {jobTitle}
</Typography>   


     <Typography
className={classes.jobDescription}
variant="body1"
>

{jobDescription}
</Typography>   

<Typography
className={classes.jobDescription}
variant="body1"
>
State: {state}
<br/>
    Category: {category}
</Typography>    

   
   <br/>
   <br/>
     
 { deleteButton }
 { replyButton }
 { reportButton }


 <br/>

   <br/>
     
  
  

<div className="img-grid">
{ images && images.map(url => (
    <div  key={url}
    className="img-wrap"
    onClick={() => this.setState({selectedImg: url})}
    >
<img src={url} alt="uploaded" 
    style={{objectFit: 'cover',   resizeMode: 'contain'}}
/>
        </div>
))}
</div>



{ this.state.selectedImg && (
        <Modal selectedImg={this.state.selectedImg} 
        closeSelectedImg={this.setState({
            selectedImg: null
        })}
         />
      )}





     </div>
</DialogContent>




            </Fragment>
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.user,
    jobPost: state.data.jobPost,
    UI: state.UI,
})

const mapActionsToProps = {
    getJobPost, deleteJobPost 
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPostPage));


