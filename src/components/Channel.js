import React, { useEffect } from 'react';
import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { db } from '../firebase';

function Channel({ user, channelID }) {

  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelID}`]: true
    })
  }, [user.uid, channelID]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelID={channelID} />
        <Messages channelID={channelID} />
        <ChatInputBox user={user} channelID={channelID} />
      </div>
      <Members channelID={channelID} />
    </div>
  );
}

export default Channel;
