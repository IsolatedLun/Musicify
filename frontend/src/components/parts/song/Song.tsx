import React from 'react';
import { fetchAudio, setCurrSong, setSongsToPlay, setSongType } from '../../../features/music-slice';
import { useAppDispatch } from '../../../hooks/hooks';
import { API_URL, GET_THUMBNAIL } from '../../../misc/consts';
import { INF_Song } from '../../../misc/interfaces';
import { toggleElement } from '../../../misc/utils';

const Song = ({ song, idx, ignore, queueType, referBy } : 
    { song: INF_Song, idx: number, ignore: boolean, queueType: string | null, referBy: string }) => {
    const dispatch = useAppDispatch();

    const selectSong = (id: number | null, referBy: string) => {
        dispatch(setSongType(referBy));
        dispatch(setCurrSong({ id, referBy }));
        toggleElement('music-player', '96%', '2%', 'active', ignore);
    }

    if(!song) {
        return(<div></div>)
    }

    return (
        <a className='song' data-type={queueType} tabIndex={0} onKeyDown={(e) => {
            if(e.key === 'Enter') selectSong(song.id, referBy)
        }}

            onClick={() => selectSong(song.id, referBy)} id={'song-' + song.id + (queueType ? '-queue' : '')}>
            <h2 className='song__queue light--h capitalize'>{ queueType }</h2>
            <div className="song__thumbnail">
                <img loading='lazy'
                src={GET_THUMBNAIL + song.id} alt={song.title + ' thumbnail'} />
            </div>
            <h1 className="song__title capitalize elliptic">{ song.title }</h1>
            <p className="song__author capitalize">{ song.author }</p>
        </a>
    )
}

export default Song
