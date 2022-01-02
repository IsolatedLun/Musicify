import React from 'react';
import { API_URL } from '../../misc/consts';
import { INF_Song } from '../../misc/interfaces';

const Song = ({ song } : { song: INF_Song }) => {
    return (
        <div className='song'>
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
