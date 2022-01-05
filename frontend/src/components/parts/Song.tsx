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
        dispatch(setCurrSong(idx));
        toggleMusicPlayer(ignore);
        console.log(ignore)
    }

    if(!song) {
        return(<div></div>)
    }

    return (
        <a className='song' data-type={queueType} tabIndex={0} onKeyDown={(e) => {
            if(e.key === 'Enter') selectSong(song.id)
        }}

            onClick={() => selectSong(song.id)} id={'song-' + idx + (queueType ? '-queue' : '')}>
            <h2 className='song__queue light--h capitalize'>{ queueType }</h2>
            <div className="song__thumbnail">
                <img loading='lazy'
                src={API_URL + 'songs/thumb/' + song.id} alt={song.title + ' thumbnail'} />
            </div>
            <h1 className="song__title capitalize">{ song.title }</h1>
            <p className="song__author capitalize">{ song.author }</p>
        </a>
    )
}

export default Song
