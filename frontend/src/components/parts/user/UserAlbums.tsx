import React from 'react';
import { User } from '../../../misc/interfaces';

const UserAlbums = ({ user }: { user: User }) => {
  return(
      <div className="user__albums">
          <h1 className="albums__title">{ user.producer_name }'s albums</h1>
      </div>
  )
};

export default UserAlbums;
