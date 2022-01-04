import React, { useEffect } from 'react'
import { fetchSongs } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks'
import { INF_Song } from '../misc/interfaces';
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
        <div className="browse-container" id='main-content'>

            <div className="songs">
                {
                    songs.map((song: INF_Song, idx: number) => (
                        <Song song={song} key={song.id} idx={idx} ignore={false} queueType={null} />
                    ))
                }
            </div>

        </div>
    )
}

export default Browse
