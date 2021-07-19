
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

import { Tooltip} from '@material-ui/core';

import { deleteConversation } from '../redux/actions/dataActions'
//icons

import ReplyIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutLine from '@material-ui/icons/DeleteOutline';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

import { connect } from 'react-redux';


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







 class Conversation extends Component {

    state = {
ocu: ""
    }

    componentDidMount(){
    

        const  recieverId =  this.props.receiverId
        const  senderId = this.props.senderId

const ocu = recieverId !== this.props.user.credentials.username? (
    recieverId 
) : ( 
  senderId
   )

   this.setState({
       ocu: ocu
   })

    }

handleDeleteConversation = (conversationId,currentUserUsername) => {
console.log(`${this.state.ocu}${this.props.jobPostId}`,this.props.user.credentials.username)

this.props.deleteConversation(`${this.state.ocu}${this.props.jobPostId}`,this.props.user.credentials.username)

}

    render() {

      dayjs.extend(relativeTime)
    
        const { classes, 

        } = this.props

        const { credentials
        } = this.props.user

      

      
        const  recieverId =  this.props.receiverId
        const  senderId = this.props.senderId

        const dName = recieverId !== credentials.username? (
            recieverId 
       ) : ( 
          senderId
           )
  

           
        const displayName = recieverId === credentials.username? (

             <p> { senderId }</p>
        ) : ( 
           <p> {recieverId}</p>
            )



        return (

            <Card 
            className={classes.card}
            >
                <CardMedia
                image={this.props.mainImage}
                title="Profile Image"
                className={classes.image}
                />

              <CardContent className={classes.content}>

        
        <div style={{display: "flex"}}>
              <Typography variant="h5" component={Link}
               to={`/users/${dName}`} 
          
               >
                
              {displayName}
              </Typography>

              <Typography

        color="textSecondary"
        variant="h5"
        >
        
        {this.props.conversationsRead ? 
        null
        : 

<MarkunreadMailboxIcon color="secondary"> </MarkunreadMailboxIcon>

}
        </Typography>
</div>

              <Typography variant="h3" component={Link}
            //    to={`/users/${this.props.receiverId}`} 
               color="primary">
              {this.props.jobTitle}
              </Typography>


              {/* npm i dayjs */}
              <Typography variant="body2" color="textSecondary">
             
              {dayjs(this.props.createdAt).fromNow()} {`- Posted By ${this.props.jobPostOwnersUsername}`}
              </Typography>

              <br/>
              <br/>


              

            
              <Typography
        
        color="textSecondary"
        variant="h5"
        >
        {`${this.props.replyText}`}
        </Typography>




            
       

    



        



              <br/>
              <br/>





<Link to={{ 
  pathname: `/ChatPage/${this.props.receiverId}`, 
  otherChatUser: this.state.ocu,
  jobPostId: this.props.jobPostId,
  mainImage:this.props.mainImage,
  jobTitle:this.props.jobTitle,
  jobPostOwnersUsername:this.props.jobPostOwnersUsername,
  jobId: this.props.jobId,
  
}}
> 

  <IconButton onClick={this.handleOpen} >
<ReplyIcon color="primary"> </ReplyIcon>
</IconButton>
 </Link>



 


  <Tooltip title="delete" placement="right">
<IconButton onClick={this.handleDeleteConversation}>
    <DeleteOutLine 
    
    color="secondary"> </DeleteOutLine>
</IconButton>
  </Tooltip>


             </CardContent>
   

            </Card>
        
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.user,
    conversations: state.data

})

const mapActionsToProps = {
    deleteConversation,
  
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Conversation));


