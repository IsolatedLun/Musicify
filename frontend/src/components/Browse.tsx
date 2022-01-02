import React, { useEffect } from 'react'
import { fetchSongs } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks'
import Loader from './layout/Loader'
import Song from './parts/Song';

const Browse = () => {
    const { songs, status } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(songs.length < 1) {
            dispatch(fetchSongs());
        }
    }, [])

    return (
        status === 'idle'
        ?
        <Loader />
        :
        <div className="songs">
            {
                songs.map((song) => (
                    <Song song={song} />
                ))
            }
        </div>
    )
}

export default Browse
