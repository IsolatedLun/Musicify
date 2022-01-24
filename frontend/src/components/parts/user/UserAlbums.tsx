import React, { useEffect } from 'react';
import { setUploadedAlbum } from '../../../features/music-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { User } from '../../../misc/interfaces';
import { useGetUserAlbumsQuery } from '../../../services/albumService';
import Loader from '../../layout/Loader';
import Albums from '../album/Albums';
import ResultTitle from '../utils/ResultTitle';

const UserAlbums = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()
  const { hasUploadedAlbum } = useAppSelector(state => state.music);
  const { data, isSuccess, isFetching, refetch } = useGetUserAlbumsQuery();

  useEffect(() => {
    if(hasUploadedAlbum) {
      refetch();
      dispatch(setUploadedAlbum(false));
    }
  }, [])

  if(data)
    return(
        <div className="user__albums">
          <ResultTitle text={`${user.producer_name}'s albums`} resultText='album' amt={data.length} />

            <div className="albums">
              {
                isFetching && <Loader text='Loading albums...' />
              }
              {
                isSuccess && data && <Albums albums={data} />
              }
            </div>
        </div>
    )
  else
      return(<></>)
};

export default UserAlbums;
