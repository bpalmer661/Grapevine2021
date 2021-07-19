
import React, { Component, Fragment, link } from 'react'
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';


import { Link } from 'react-router-dom';
import DeleteJobPost from './DeleteJobPost'

//MUI 
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'

import dayjs from 'dayjs'
import CircularProgress from '@material-ui/core/CircularProgress';

//icons



import UnfoldMore from '@material-ui/icons/UnfoldMore';
import Message from '@material-ui/icons/Message';



import CloseIcon from '@material-ui/icons/Close';

import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import { getJobPost, deleteJobPost } from '../../redux/actions/dataActions'
import Modal from '../Modal'




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
        width: 400,
        height: 250,
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
        width: 100,
        height: 100,
        objectFit: 'fit',
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: '50%',
        border: "black"
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
export class JobPostDetails extends Component {

state = {
    open: false,
    oldPath: "",
    newPath:"",
    selectedImg:null,
    disabled: false,
}

handleOpen = (state, category) => {

let oldPath = window.location.pathname;
const  { username, jobId } = this.props;
const newPath = `/users/${username}/jobPost/${jobId}`
if(oldPath === newPath ) oldPath = `/users/${username}`
window.history.pushState(null, null, newPath);
    this.setState({open: true, oldPath,newPath});


    
    this.props.getJobPost(this.props.state,this.props.category,this.props.jobId);
}

handleClose = () => {
    window.history.pushState(null,null, this.state.oldPath);
    this.setState({open: false});
}

deleteJobPost = () => {
    this.props.deleteJobPost(this.props.jobId);
    this.setState({open: false});
}


componentDidMount(){



    if(this.props.openDialog){
        this.handleOpen();
    }
}


setSelectedImage = (url) => {
    this.setState({selectedImg: url});
}





    render() {
        


 const { classes,
    jobPost: { jobDescription, 
        jobTitle,
    createdAt,
    username,
    jobId ,
    state,
    category,
    mainImage,
    images,
    userImageUrl

},
UI: { loading } ,
user: {
    authenticated,
    credentials
},
}  = this.props;


const deleteButton = authenticated && username === credentials.username ? (
    <DeleteJobPost jobPostId =
    {jobId}/>
) : null




const replyButton  = authenticated && this.props.jobPostOwnersUsername !== credentials.username ? (


<Link
to={{ 
  pathname: `/ChatPage/${this.props.jobPostOwnersUsername}`, 
  jobId: this.props.jobId,
  jobPostOwnersUsername: this.props.jobPostOwnersUsername,
  state: this.props.state,
  category: this.props.category,
  mainImage: this.props.mainImage,
  jobTitle: this.props.jobTitle,
  otherChatUser:this.props.otherChatUser,
}}> 

  <IconButton onClick={this.handleOpen} >
<Message color="primary"> </Message>
</IconButton>
 </Link>





) : null



    const dialogMarkup = loading ? (
        <CircularProgress
        size={200}
        />
    ) : ( 
   
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

<Typography
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
< Typography variant="h3">
    {jobTitle}
     </Typography>
     <br/>
    
< Typography 
className={classes.jobDescription}
variant="body1">
    {jobDescription}
     </Typography>
     <br/>
    
    < Typography 
className={classes.jobDescription}
variant="body1">
    State: {state}
<br/>
    Category: {category}
     </Typography>
   <br/>
   <br/>
     
 { deleteButton }
 { replyButton }
 <br/>

   <br/>
     
  
  

<div className="img-grid">
{ images && images.map(url => (
    <div  key={url}
    className="img-wrap"
    onClick={() => this.setState({selectedImg: url})}
    >
<img src={url} alt="uploaded" />
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
    )
        return (
            <Fragment >



<MyButton onClick={this.handleOpen} tip="Job Details" 
tipClassName={classes.expandButton}
>
<UnfoldMore color="primary" />
</MyButton>
<Dialog
                    open={this.state.open}
                    onClose={this.state.handleClose}
                    fullWidth
                    maxwidth="lg"
                    >
            
               <MyButton 
                onClick={this.handleClose} 
                tip="Close"
                tipClassName={classes.closeButton}
                    >
<CloseIcon/> 
                </MyButton>

<DialogContent 
className={classes.DialogContent}
>
{dialogMarkup}
</DialogContent>

                </Dialog>

            </Fragment>
        )
    }
}




const mapStateToProps = (state) => ({
    jobPost: state.data.jobPost,
    UI: state.UI,
    user: state.user,
})


const mapActionsToProps = {
    getJobPost,
    deleteJobPost
}



export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPostDetails));

