
import React, { Component , Fragment , link} from 'react'


//MUI 
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


import { connect } from 'react-redux';

import { getJobPost, deleteJobPost,addImageToJobPost,deleteImageFromJobPost } from '../../redux/actions/dataActions'


import MyButton from '../../util/MyButton'


import Add from '@material-ui/icons/Add';


import { DialogContent } from '@material-ui/core';
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



 


 class EditJobPostPage extends Component {

    state = {
        open: false,
        oldPath: "",
        newPath:"",
        selectedImg:null,
        disabled: false,
    }
    

componentDidMount(){




    this.props.getJobPost(this.props.location.state,this.props.location.category,this.props.location.jobId);




}




 handleRemove = (url,state,category,jobId,username) => {
    this.props.deleteImageFromJobPost(url,state,category,jobId,username);
    }
    



handleImageChange = (event) => {

       const state = this.props.location.state
        const category = this.props.location.category
        const jobId = this.props.location.jobId
      
    const image = event.target.files[0];
   const formData = new FormData();
   formData.append('image', image, image.name);

   this.props.addImageToJobPost(formData, state, category, jobId);
   
};


addImage = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click();
}





    render() {

    

        // console.log("jobPost,js this is this.props.jobPostOwnersUsername: " + this.props.jobPostOwnersUsername)

      dayjs.extend(relativeTime)

      
    
        const { classes, 
            
            jobPost : {
                createdAt,
            jobDescription,
            jobTitle,
            username,
            category, 
            mainImage,
            userImageUrl,
            images,
            state,
        },
            // user: {
            //     authenticated,
            //     credentials
            // },
            // loading,
        } = this.props

           
    
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
<Typography variant="h3">
    {jobTitle}
     </Typography>
     <br/>
    
<Typography 
className={classes.jobDescription}
variant="body1">
    {jobDescription}
     </Typography>
     <br/>
    
    <Typography 
className={classes.jobDescription}
variant="body1">
    State: {state}
<br/>
    Category: {category}
     </Typography>
   <br/>
   <br/>


     {/* to make the website more simple we have removed this option for now */}
 {/* { deleteButton } */}




     
  
<div className="img-grid">
{ images && images.map((url,index) => {
return ( <div  key={index}
  className="img-wrap">
     {/* <span class="close">&times;</span> */}
     <button onClick={ () => this.handleRemove(url,this.props.location.state,this.props.location.category,this.props.location.jobId,this.props.location.jobPostOwnersUsername)} className="close">X</button>
     
<img src={url} alt="uploaded" 
    style={{objectFit: 'cover',   resizeMode: 'contain'}}
/>
      </div>
)
 }
)}
<div className={"image-wrapper"}> 
   <input 
   type="file"
    id="imageInput" 
    onChange={this.handleImageChange} 
    hidden="hidden"
    /> 
<MyButton tip="Add Image"
 onClick={this.addImage}
  className="button">
<Add color="primary" />
 </MyButton>
    </div>
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
    getJobPost, deleteJobPost,
    addImageToJobPost,
    deleteImageFromJobPost,
}


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(EditJobPostPage));


