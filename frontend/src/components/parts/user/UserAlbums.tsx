import React from 'react';
import { User } from '../../../misc/interfaces';
import { useGetUserAlbumsQuery } from '../../../services/albumService';
import Loader from '../../layout/Loader';
import Albums from '../album/Albums';

const UserAlbums = ({ user }: { user: User }) => {
  const { data, isSuccess, isFetching } = useGetUserAlbumsQuery();

  return(
      <div className="user__albums">
          <h1 className="albums__title">{ user.producer_name }'s albums</h1>
          {
            isFetching && <Loader text='Loading albums...' />
          }
          {
            isSuccess && data && <Albums albums={data} />
          }
      </div>
  )
};

export default UserAlbums;
