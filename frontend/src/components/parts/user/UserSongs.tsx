import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { INF_Song, User } from '../../../misc/interfaces';
import { useGetUploadedSongsQuery } from '../../../services/musicService';
import Songs from '../song/Songs';
import Loader from '../../layout/Loader';
import { setSongList } from '../../../features/music-slice';
import ResultTitle from '../utils/ResultTitle';

const UserSongs = ({ user }: { user: User }) => {
    const { data, isLoading, isFetching, isSuccess, error, refetch } = useGetUploadedSongsQuery();
    
    const uploadedSongs = useAppSelector(state => state.music.songsToPlay['ref-uploaded'])
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(data && data !== undefined) {
            dispatch(setSongList({ songKey: 'ref-uploaded', data: (data as any)['data'] }));
        }

    }, [isFetching])

    useEffect(() => {
        refetch();
    }, [])

    if(isFetching)
        return <Loader text='Loading uploaded songs...'/>
    
    else if(isSuccess && uploadedSongs) {

        return (
            <div className="user__songs">
                <ResultTitle text={`${user.producer_name}'s songs`} resultText='song' 
                    amt={uploadedSongs.length} />

                <div className="songs__results songs">
                    <Songs songs={uploadedSongs} referBy='ref-uploaded' direction='vert'
                        fallbackEl={<p>No uploaded songs.</p>} editable={true}/>
                </div>
            </div>
        )
    }
    else
        return(<></>)
}

export default UserSongs
