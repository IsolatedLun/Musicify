import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { INF_Song, User } from '../../../misc/interfaces';
import { useGetUploadedSongsQuery } from '../../../services/musicService';
import Songs from '../song/Songs';
import Loader from '../../layout/Loader';
import { setSongList } from '../../../features/music-slice';
import ResultTitle from '../utils/ResultTitle';

const UserSongs = ({ user }: { user: User }) => {
    const { data, isLoading, isFetching, isSuccess, error } = useGetUploadedSongsQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(data) {
            dispatch(setSongList({ songKey: 'ref-uploaded', data: (data as any)['data'] }));
        }

        
    }, [isFetching])

    useEffect(() => {
        console.log(error)
    }, [error])

    if(isFetching)
        return <Loader text='Loading uploaded songs...'/>
    
    else if(isSuccess && data) {
        const anyData: any = (data as any)['data'];

        return (
            <div className="user__songs">
                <ResultTitle text={`${user.producer_name}'s songs`} resultText='song' amt={anyData.length} />

                <div className="songs__results songs">
                    <Songs songs={anyData} referBy='ref-uploaded' mode='def' direction='vert'
                        search='' genre='' fallbackEl={<p>No uploaded songs.</p>} editable={true}/>
                </div>
            </div>
        )
    }
    else
        return(<></>)
}

export default UserSongs
