import React from 'react';
import { fetchAudio, setCurrSong } from '../../features/music-slice';
import { useAppDispatch } from '../../hooks';
import { API_URL } from '../../misc/consts';
import { INF_Song } from '../../misc/interfaces';
import { toggleMusicPlayer } from '../../misc/utils';

const Song = ({ song, idx } : { song: INF_Song, idx: number }) => {
    const dispatch = useAppDispatch();

    const selectSong = (id: number) => {
        dispatch(setCurrSong(idx));
        dispatch(fetchAudio(id));
        toggleMusicPlayer();
    }

    return (
        <div className='song' onClick={() => selectSong(song.id)}>
            <div className="song__thumbnail">
                <img loading='lazy'
                src={API_URL + 'songs/thumb/' + song.id} alt={song.title + ' thumbnail'} />
            </div>
            <h1 className="song__title">{ song.title }</h1>
            <p className="song__author">{ song.author }</p>
        </div>
    )
}

export default Song
