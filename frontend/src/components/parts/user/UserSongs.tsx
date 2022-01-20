import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { INF_Song, User } from '../../../misc/interfaces';
import { useGetUploadedSongsQuery } from '../../../services/musicService';
import Songs from '../song/Songs';
import Loader from '../../layout/Loader';
import { setSongList } from '../../../features/music-slice';

const UserSongs = ({ user }: { user: User }) => {
    const { data, isLoading, isFetching, isSuccess } = useGetUploadedSongsQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(data) {
            dispatch(setSongList({ songKey: 'ref-uploaded', data: (data as any)['data'] }));
        }
    }, [isFetching])

    if(isFetching)
        return <Loader text='Loading uploaded songs...'/>
    
    else if(isSuccess && data)
        return (
            <div className="user__songs">
                <h1 className="songs__title">{ user.producer_name }'s songs  
                    <span className="txt--muted txt--small"> { (data as any)['data'].length } result(s)</span>
                </h1>

                <div className="songs__results songs">
                    <Songs songs={(data as any)['data']} referBy='ref-uploaded' mode='def' 
                        search='' genre='' fallbackEl={<p>No uploaded songs</p>}/>
                </div>
            </div>
        )
    else
        return(<></>)
}

export default UserSongs
