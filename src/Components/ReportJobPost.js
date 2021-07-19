
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';


import axios from 'axios'


//MUI 
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'



import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, TextField } from '@material-ui/core';
import { getJobPost, deleteJobPost } from '../redux/actions/dataActions'
import Modal from './Modal'
import { Report } from '@material-ui/icons';

import Button from '@material-ui/core/Button';



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

   

})
export class ReportJobPost extends Component {

    state = {
        open: false,
       reportText: "",
    }


    submitReport = () =>{
console.log("handle report called")
this.handleClose()
    
console.log("username:  " +  this.props.username)





const reportDetails = {
    jobPostId: this.props.jobId ?? "", 
    createdAt: new Date().toISOString() ?? "", 
    jobPostOwnersUsername: this.props.jobPostOwnersUsername ?? "", 
    reportersUsername: this.props.username ?? "",
   jobTitle: this.props.jobTitle ?? "",
   jobDescription: this.props.jobDescription ?? "",
   state: this.props.state ?? "",
   category: this.props.category ?? "",
   mainImage: this.props.mainImage ?? "",
   reportText: this.state.reportText ?? "",
}

axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/reportJobPost`,reportDetails)
      }




handleOpen = (state, category) => {


this.setState({open: true});
    getJobPost(this.props.state,this.props.category,this.props.jobId);
}

handleClose = () => {
    // window.history.pushState(null,null, this.state.oldPath);
    this.setState({open: false});
}

handleChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    });
}

componentDidMount(){


    console.log("componentDidMount called inside reportJobPost : "  + this.props.jobId)

    console.log("this is jobId : "  + this.props.jobId)

    console.log("this is state : "  + this.props.state)

    console.log("this is category : "  + this.props.category)

    if(this.props.openDialog){
        this.handleOpen();
    }
}


setSelectedImage = (url) => {
    this.setState({selectedImg: url});
}





    render() {
        
       

 const 
 { classes,
//     jobPost: { 
//         jobDescription, 
//         jobTitle,
//     createdAt,
//     username,
//     jobId ,
//     state,
//     category,
//     mainImage,
//     images,
//     userImageUrl

// },
// UI: { loading } ,
// user: {
//     authenticated,
//     credentials
// },
}  = this.props;

const { jobPost } = this.props



    const dialogMarkup = this.open ? ( 
   
    <div >

<hr 
className={classes.invisibleSeparartor}
/>
<Typography variant="body2" color="textSecondary" >
    
{/* {`Job Posted: ${dayjs(createdAt).fromNow()}`} */}

</Typography>

<Typography variant="h3">
    {jobPost.jobTitle}
     </Typography>
     <br/>
    
<Typography 
className={classes.jobDescription}
variant="body1">
    {/* {jobDescription} */}
     </Typography>
     <br/>
    
    <Typography 
className={classes.jobDescription}
variant="body1">
    State: {jobPost.state}
<br/>
    Category: {jobPost.category}
     </Typography>
  
     
  


{ this.state.selectedImg && (
        <Modal selectedImg={this.state.selectedImg} 
        closeSelectedImg={this.setState({
            selectedImg: null
        })}
         />
      )}





     </div>
    ) : (

        <Fragment>
      <h2>Report This Job Post</h2>

      <h5>Please Enter In Detail Why You Are Reporting This Job Post</h5>
<TextField
fullWidth
maxwidth
 multiline
rows={4}
// placeholder="Enter Text Here."
onChange={this.handleChange}
name="reportText" 
 type="reportText" 
 label="Enter Text" 
                     >
   


</TextField>









<br/>
<br/>
      
     
 <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     style={{display: "flex",justifyContent: "center", width:"200px"}}
                    
                    onClick={() => this.submitReport()}
                       >Submit </Button>
     </Fragment>

    ) 
        return (
            <Fragment >



<MyButton onClick={this.handleOpen} tip="Job Details" 
>
<Report color="primary" />
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
            
                    >
<CloseIcon/> 
                </MyButton>

<DialogContent 
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
    user: state.user
})



const mapActionsToProps = {
    getJobPost,
    deleteJobPost,
}



export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ReportJobPost));

