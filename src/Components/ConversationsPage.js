//conversationPage.js
import React, { useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';


import {getConversations } from '../redux/actions/dataActions';
import Conversation from '../Components/Conversation';
     
export default function ConversationsPage() {

  const store = useSelector(state => state.user.credentials)

  const convoStore = useSelector(state => state.data.conversations)

  var username = store.username


const dispatch = useDispatch();


/* eslint-disable */
  var unsubscribe;




  useEffect(() => {


    
  

    unsubscribe = dispatch(getConversations(username))

    .then(unsubscribe => {
      
      return unsubscribe;
    })
    .catch(error => {
      console.log(error);
    })    
  }, []);





   return (

    
/* eslint-disable */
     <div>

{/* this is convoStore: [{"email":"qdf","senderId":"bb","jobTitle":"plumber needed",
"mainImage":"https://upload.wikimedia.org/wikipedia/commons/8/84/Claw-hammer.jpg",
"userImage":"https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/default-avatar.jpg?alt=media",
"receiverId":"newPop","replyText":"adfvadfv","jobPostId":"moOGQTnqCPJ5iDMBfiVN","number":"","username":"bb",
"createdAt":"2021-03-24T12:40:18.113Z","read":false},{"createdAt":"2021-03-24T12:12:51.134Z",
"senderId":"brown","jobPostId":"moOGQTnqCPJ5iDMBfiVN",
"read":false,"mainImage":"https://upload.wikimedia.org/wikipedia/commons/8/84/Claw-hammer.jpg", */}

       <h1 style={{textAlign:"center", padding:"40px"}}>Messages</h1>


      
{ convoStore && convoStore.map(doc => (
    /* eslint-disable */
      <Conversation  
     key={doc.username + doc.replyText + doc.createdAt}
     jobTitle={doc.jobTitle}
     receiverId={doc.receiverId}
      mainImage={doc.mainImage} 
      createdAt={doc.createdAt}
      replyText={doc.replyText}
      username={doc.username}
      jobPostId={doc.jobPostId}
      senderId={doc.senderId}
      jobPostOwnersUsername={doc.jobPostOwnersUsername}
      jobId={doc.jobPostId}
      conversationsRead={doc.read}
     />
)
)}
      </div>

   )


}
