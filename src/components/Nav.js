import React from 'react';
import { firebase } from "../firebase";
import { Link } from "@reach/router";

import useCollection from "../custom-hooks/useCollection";

function Nav({ user }) {
  const channels = useCollection("channels");

  const handleLogout = () => {
    firebase.auth().signOut();
  }

  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src={user.photoURL}
        />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button className="text-button" onClick={handleLogout}>log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}># {channel.id}</Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
