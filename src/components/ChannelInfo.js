import React from 'react';
import useDoc from "../custom-hooks/useDoc";

function ChannelInfo({ channelID }) {

  const channel = useDoc(`channels/${channelID}`)

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value={ channel && channel.topic } />
      </div>
      <div className="ChannelName"># {channelID}</div>
    </div>
  );
}

export default ChannelInfo;
