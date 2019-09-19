import React from 'react';
import { format, isSameDay } from "date-fns";

import useCollection from "../custom-hooks/useCollection";
import useDocWithCache from "../custom-hooks/useDocWithCache";
import ChatScroll from "../custom-hooks/useChatScroll";

function Messages({ channelID }) {

  const messages = useCollection(`channels/${channelID}/messages`);

  return (
    <ChatScroll className="Messages">
      <div className="EndOfMessages">That's every message!</div>      
      {
        messages.map((message, index) => {
          const showDay = handleShowDay(messages, message, index);

          return handleShowAvatar(messages, message, index) ? <FirstMessage key={message.id} message={message} showDay={showDay}/> 
            : <NotFirstMessage key={message.id} message={message}/>
        })
      }
    </ChatScroll>
  );
}

function handleShowDay(messages, message, messageIndex){

  const previous = messages[messageIndex - 1];

  if(previous){
    if(!isSameDay(previous.createdAt.seconds * 1000, message.createdAt.seconds * 1000 )) return true;
  }

  else return true;
}

function handleShowAvatar(messages, message, messageIndex){
  
  const previous = messages[messageIndex - 1];
  
  if(previous){
    if(message.user.id !== previous.user.id) return true;
    if(message.createdAt.seconds - previous.createdAt.seconds > 180) return true;
  }

  else return true;
}

function FirstMessage({ message, showDay }){

  const author = useDocWithCache(message.user.path);

  return (
    <div>
      { showDay && ( <div className="Day">
        <div className="DayLine" />
        <div className="DayText">{ new Date(message.createdAt.seconds * 1000).toLocaleDateString() }</div>
        <div className="DayLine" />
      </div> )}
      <div className="Message with-avatar">
        <div className="Avatar" style={ author ? { backgroundImage: `url("${author.photoURL}")` } : null} />
        <div className="Author">
          <div>
            <span className="UserName">{ author && author.displayName } {" "}</span>
            <span className="TimeStamp">{ format(message.createdAt.seconds * 1000, "h:mm a")}</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

function NotFirstMessage({ message }){
  return (
    <div className="Message no-avatar">
      <div className="MessageContent">{message.text}</div>
    </div>
  );
}

export default Messages;