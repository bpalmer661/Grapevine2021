
import React from 'react'

import './ChatRoom.css'



import { useSelector } from 'react-redux'

import avatar from '../Images/avatar.jpg'



  function ChatMessage(props) {
    const { text, usersPhoto, uid } = props.message;



const store = useSelector(state => state.user.credentials)

    //  var userId = store.userId
 

    const messageClass = uid === store.userId ? 'CRsent' : 'CRreceived';

    const messageContainer = uid === store.userId ? 'CRsent' : 'CRmessage';
  
    return (<>
      <div className={`CRmessage ${messageContainer}`}>
        <img className={"chatRoomImage"} alt={"alt"} src={usersPhoto || avatar} />
        <p  className={`${messageClass}`} >{text}</p>
      </div>
    </>)
  }


  export default ChatMessage;