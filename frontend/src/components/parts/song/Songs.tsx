import React from 'react'
import { INF_Song } from '../../../misc/interfaces'
import Loader from '../../layout/Loader'
import Song from './Song'

const Songs = ({ songs, referBy, direction='vert', fallbackEl=<></>, editable=false } : 
    { songs: INF_Song[] | null | undefined, referBy: string, direction: 'horiz' | 'vert', editable: boolean,
        fallbackEl: React.Component | JSX.Element }) => {

    if(songs !== undefined && songs !== null && songs.length > 0) {
        return <>{
            songs.map((song: INF_Song, idx: number) => (
                <Song song={song} key={song.id} idx={idx} direction={direction}
                    ignore={false} queueType={null} referBy={referBy} editable={editable} />
            ))
        }</>
    }
    
    else
        return (<>{ fallbackEl }</>)
}

export default Songs
