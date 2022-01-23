import React from 'react'
import { INF_Song } from '../../../misc/interfaces'
import Loader from '../../layout/Loader'
import Song from './Song'

const Songs = ({ songs, referBy, mode='def', search='', direction='vert',
    genre='', fallbackEl=<></>, editable=false } : 
    { songs: INF_Song[] | null | undefined, referBy: string, mode: 'def' | 'filter', 
        search: string, genre: string, direction: 'horiz' | 'vert', editable: boolean,
        fallbackEl: React.Component | JSX.Element }) => {

    if(songs !== undefined && songs !== null) {
        if(mode === 'def')
            return <>{
                songs.map((song: INF_Song, idx: number) => (
                    <Song song={song} key={song.id} idx={idx} direction={direction}
                        ignore={false} queueType={null} referBy={referBy} editable={editable} />
                ))
            }</>

        else if(mode === 'filter')
            return <>{
                songs.filter(song => song.title.toLowerCase().indexOf(search) > -1)
                    .filter(song => {
                        if(genre === 'all') {
                            return song;
                        }

                        else if(song.genre === genre) {
                            return song
                        }
                    })
                    .map((song: INF_Song, idx: number) => (
                    <Song song={song} key={song.id} idx={idx} direction={direction}
                        ignore={false} queueType={null} referBy={referBy} editable={editable} />
            ))}</>
        else
            return(<></>)
    }
    
    else
        return (<>{fallbackEl}</>)
}

export default Songs
