import React from 'react';
import { API_URL, GET_THUMBNAIL } from '../../../misc/consts';
import { INF_Song } from '../../../misc/interfaces';

const SongPreview = ({ song, currId, isQueue } : { song: INF_Song, currId: number | null, isQueue: boolean }) => {
    if(!song || song.id === currId) {
        if(isQueue) {
            return(<div></div>);
        }
    }

    return (
        <div className={`music__repr flex--align flex--col ${isQueue ? 'music__queue' : ''}`}>
            <div className="music__head flex--align flex--col gap--05">
                <h1 className="music__title capitalize">{ song.title }</h1>
                {
                    !isQueue
                    ?
                    <div className="music__stats flex--align flex--center gap--1 text--center">
                        <div className="music__stat">
                            <i className="fas fa-eye views"></i>
                            <p className="stat__num">{ song.views }</p>
                        </div>
                        <div className="music__stat">
                            <i className="fas fa-star rate"></i>
                            <p className="stat__num">{ song.rating }</p>
                        </div>
                    </div>
                    : null
                }
            </div>
            <div className="music__thumbnail">
                <img src={ song ? GET_THUMBNAIL + song.id : '' } 
                    alt={song.title + ' thumbnail'} />
            </div>
        </div>
    )
}

export default SongPreview
