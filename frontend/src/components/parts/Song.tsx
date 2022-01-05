import React from 'react';
import { fetchAudio, setCurrSong } from '../../features/music-slice';
import { useAppDispatch } from '../../hooks';
import { API_URL } from '../../misc/consts';
import { INF_Song } from '../../misc/interfaces';
import { toggleMusicPlayer } from '../../misc/utils';

const Song = ({ song, idx, ignore, queueType } : 
    { song: INF_Song, idx: number, ignore: boolean, queueType: string | null }) => {
    const dispatch = useAppDispatch();

    const selectSong = (id: number | null) => {
        dispatch(setCurrSong(id));
        toggleMusicPlayer(ignore);
    }

    if(!song) {
        return(<div></div>)
    }

    return (
        <a className='song' data-type={queueType} tabIndex={idx} onKeyDown={(e) => {
            if(e.key === 'Enter') selectSong(song.id)
        }}

            onClick={() => selectSong(song.id)} id={'song-' + song.id + (queueType ? '-queue' : '')}>
            <h2 className='song__queue light--h capitalize'>{ queueType }</h2>
            <div className="song__thumbnail">
                <img loading='lazy'
                src={API_URL + 'songs/thumb/' + song.id} alt={song.title + ' thumbnail'} />
            </div>
            <h1 className="song__title capitalize elliptic">{ song.title }</h1>
            <p className="song__author capitalize">{ song.author }</p>
        </a>
    )
}

export default Song
