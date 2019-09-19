import React from 'react';
import useCollection from "../custom-hooks/useCollection";

function Members({ channelID }) {

  const members = useCollection("users", "", [`channels.${channelID}`, "==", true]);
  return (
    <div className="Members">
      {
        members.sort(sortByName).map(member => (
          <div key={member.id} className="Member">
            <div className={`MemberStatus ${member.status.state}`} />
            {member.displayName}
          </div>
        ))
      }
    </div>
  );
}

function sortByName(a, b){
  return a.displayName > b.displayName ? 1
  : a.displayName < b.displayName ? -1
  : 0;
}

export default Members;
