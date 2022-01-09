import { useEffect } from 'react'
import { fetchRecentSongs } from '../../../features/music-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Songs from '../song/Songs';
import UserHeader from './UserHeader'

const UserHome = () => {
    const dispatch = useAppDispatch();
    const { recentSongs, favoriteSongs } = useAppSelector(state => state.music)
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if(user !== null) {
            dispatch(fetchRecentSongs(user.id))
        }
    }, [user])

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
