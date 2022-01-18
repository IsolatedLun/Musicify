import { useEffect } from 'react';
import { setSongList } from '../../../features/music-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { User } from '../../../misc/interfaces';
import { useGetRecentSongsQuery } from '../../../services/musicService';
import Songs from '../song/Songs';

const UserHome = ({ user }: { user: User | null }) => {
    const dispatch = useAppDispatch();
    
    const { data, isLoading, isFetching, isSuccess } = useGetRecentSongsQuery();

    useEffect(() => {
        if(data) {
            const anyData: any = data;
            dispatch(setSongList({ songKey: 'ref-recent', data: anyData['recents'] }));
            dispatch(setSongList({ songKey: 'ref-favorite', data: anyData['favorites'] }));
        }
    }, [isFetching])

    return (
        <div className='user__home flex flex--col gap--1'>
            <div className="home__part">
                <h2 className="items__title">Recents</h2>

                    {isSuccess && (
                        <div className="part__items flex flex--align gap--05">
                            <Songs songs={(data as any)['recents']} referBy='ref-recent' 
                                mode='def' fallbackEl={<p>No recent songs.</p>}
                                genre='' search=''/>
                        </div>
                    )}

                    {isFetching && (
                        <p>No recent songs.</p>
                    )}
                    
            </div>

            <div className="home__part">
                <h2 className="items__title">Favorites</h2>
                    {isSuccess && (
                        <div className="part__items flex flex--align gap--05">
                            <Songs songs={(data as any)['favorites']} referBy='ref-favorites' 
                                mode='def' fallbackEl={<p>No favorite songs</p>}
                                genre='' search=''/>
                        </div>
                    )}

                    {isFetching && (
                        <p>No favorite songs.</p>
                    )}
            </div>
                
        </div>
    )
}

export default UserHome
