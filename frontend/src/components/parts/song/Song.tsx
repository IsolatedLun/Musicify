import React from 'react';
import { setSelectedSong, setSong, setSongType } from '../../../features/music-slice';
import { useAppDispatch } from '../../../hooks/hooks';
import { GET_THUMBNAIL } from '../../../misc/consts';
import { showContextMenu } from '../../../misc/contextMenuHandler';
import { INF_Song } from '../../../misc/interfaces';
import { splitDataItem, toggleElement } from '../../../misc/utils';

const Song = ({ song, idx, ignore, queueType, referBy, direction='vert', editable=false } : 
    { song: INF_Song, idx: number, ignore: boolean, queueType: string | null, referBy: string,
    direction: 'horiz' | 'vert', editable: boolean }) => {
        
    const dispatch = useAppDispatch();

    const selectSong = (e: React.MouseEvent | null, id: number | null, referBy: string, idx: number) => {
        if(e && e.button !== 1) {
            dispatch(setSongType(referBy));
            dispatch(setSong({ songId: id, songKey: referBy, idx: idx }));
            toggleElement('music-player', '96%', '2%', 'active', ignore);
        }
    }

    if(!song) {
        return(<></>)
    }

    return (
        <a className={`song ${direction}`} data-duration={song.duration} data-editable={editable}
            onContextMenu={(e) => {
                showContextMenu(e, 'context-menu');
                dispatch(setSelectedSong(splitDataItem(e.target as HTMLElement)));
            }} 
             
            onKeyDown={(e) => {
                if(e.key === 'Enter') selectSong(null, song.id, referBy, idx)
            }}  onClick={(e: React.MouseEvent) => selectSong(e, song.id, referBy, idx)} 

            id={'song-' + song.id + (queueType ? '-queue' : '')}
            data-song='true' data-item={`${song.id};song;${referBy}`}
            data-type={queueType} tabIndex={0}
            >

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
