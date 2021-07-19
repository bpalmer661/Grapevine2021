//chatPage.js
import './ChatPage.css';
import 'firebase/firestore';


import React, { Component } from 'react'

import { connect } from 'react-redux';

import jwtDecode from 'jwt-decode';



import 'firebase/firestore';
import 'firebase/auth';



import { sendMessage,getMessages } from '../redux/actions/dataActions';


import ChatRoomHeader from './ChatRoomHeader';

import { logoutUser} from '../redux/actions/userActions'
import { db } from '../FirebaseConfig';


export const firestoreAutoId = (): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId
}





 export class ChatPage extends Component {

  state = {
    replyText:"",
    username: "",
    number: "dummy number",
    email: "dummy Email",
    open: false,
    userImage: "",
    jobPostUsername: "",
    message: "",
    otherChatUserImageUrl: "",
    otherChatUser:"",
    jobId: "",
    state: "",
    category: "",
    mainImage: "",
    jobTitle:  "",
}




componentDidMount(){
  



  const token = localStorage.FBToken
  if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
   
  localStorage.clear();
  this.props.logoutUser()
  window.location.href = '/login';
}
  } else {
    localStorage.clear();
    this.props.logoutUser()
    window.location.href = '/login';
  }




const state = this.props.location.state
const category = this.props.location.category
const otherChatUser = this.props.location.otherChatUser
const jobId =  this.props.location.jobId 



  this.setState({
    state: state,
    category: category,
    otherChatUser: otherChatUser,
  })



db.collection("users").doc(this.props.user.credentials.username).collection("conversations").doc(`${otherChatUser}${jobId}`,).update({read:true})


   const currentUser = this.props.user.credentials.username
 
  
//skipped
   if (otherChatUser != null) {
   localStorage.setItem('otherChatUser', otherChatUser);   
   }
   const otherChatUserStored = localStorage.getItem('otherChatUser');


    if (jobId != null) {
        localStorage.setItem('jobId', jobId);
      }

  
   const jobIdStored = localStorage.getItem('jobId');

   this.props.getMessages(currentUser, jobIdStored, otherChatUserStored)


  const {credentials} = this.props.user;

this.mapUserDetailsToState(credentials)


  }
  





mapUserDetailsToState = (credentials) => {

  this.setState({
      username: credentials.username ? credentials.username : '', 
      userImage: credentials.userImageUrl ? credentials.userImageUrl : "https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/100846351935.png?alt=media&token=b5490b00-ba72-4663-934b-6a921627fcd0",
  });
};


handleChange = (event) => {
  this.setState({
      [event.target.name]:event.target.value
  });
}

   
handleSubmit = () => {


if (this.state.message.trim() === ""){
  return
}



  const jobPostDetails = {
      replyText: this.state.message,
      email: this.state.email,
      number: this.state.number,
      username: this.state.username,
      userImage: this.state.userImage,
      senderId:  this.state.username,
      jobPostOwnersUsername:  this.props.location.jobPostOwnersUsername,
      receiverId: this.props.location.otherChatUser, 
      jobPostId: this.props.location.jobId,
      mainImage: this.props.location.mainImage,
      jobTitle:this.props.location.jobTitle
  };


  if (this.props.location.otherChatUser != null){
    localStorage.setItem('jobPostDetailsStored', JSON.stringify(jobPostDetails));
  }




  const jobPostDetailsStored = localStorage.getItem('jobPostDetailsStored');
  
const parsedjpd = JSON.parse(jobPostDetailsStored)
  
  const jobIdStored = localStorage.getItem('jobId');

  const new_obj = { ...parsedjpd, replyText: this.state.message  }


  this.props.sendMessage(new_obj,jobIdStored);

  this.setState({
    message: ""
  })
  
}



  
  render() {



    const { 
       messages,
  } = this.props.data;
  

  return (

    <div>

      <section className="ChatContainer">





      <ChatRoomHeader 
      className="chatRoomHeader"

      key={this.props.location.jobId} jobId={this.props.location.jobId}
     state={this.props.location.state} category={this.props.location.category} />
    
        <div className="chatArea">
            <div className="messageSections">
            
{ messages && messages.map(message => (
<div 
key={firestoreAutoId()}
style={{ textAlign: message.senderId === message.jobPostOwnersUsername ? 'right' : 'left', padding: '10px' }}
>
<p className="messageStyle"  >{message.replyText} </p>
</div>  
))}


            </div>
            
              <div className="chatControls">
                <textarea 
                  name="message" 
                  value={this.state.message}
                  onChange={this.handleChange}
                  placeholder="Write Message"
                />
                <button 
                onClick={this.handleSubmit}
                >Send</button>
            </div> 
           
    
        </div>
    </section>
  </div>


  );
                
                }
              }

            

//takes in global state
const mapStateToProps = (state) => ({
  data: state.data,
  user:state.user,
  jobPost: state.data.jobPost,
  messages:state.user.messages
})

const mapActionsToProps = {
  sendMessage,
  getMessages,
  logoutUser,
  // getUserData,
}

export default connect(mapStateToProps,mapActionsToProps)(ChatPage);


