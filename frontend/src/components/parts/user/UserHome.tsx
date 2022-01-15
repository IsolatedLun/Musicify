import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { User } from '../../../misc/interfaces';
import { useGetRecentSongsQuery } from '../../../services/musicService';
import Songs from '../song/Songs';

const UserHome = ({ user }: { user: User | null }) => {
    const { recentSongs, favoriteSongs } = useAppSelector(state => state.music)
    
    useGetRecentSongsQuery();

    return (
        <div className='user__home flex flex--col gap--1'>
            <div className="home__part">
                <h2 className="items__title">Recents</h2>
                {
                    recentSongs.length > 0
                    ?
                    <div className="part__items flex flex--align gap--05">
                        <Songs songs={recentSongs} referBy='ref-recent' mode='def' search='' genre=''/>
                    </div>
                    : <p>No recent songs.</p>
                }
            </div>

            <div className="home__part">
                <h2 className="items__title">Favorites</h2>
                {
                    favoriteSongs.length > 0
                    ?
                    <div className="part__items flex flex--align gap--05">
                        <Songs songs={favoriteSongs} referBy='ref-recent' mode='def' search='' genre=''/>
                    </div>
                    : <p>No favorite songs.</p>
                }
            </div>
                
        </div>
    )
}

export default UserHome
