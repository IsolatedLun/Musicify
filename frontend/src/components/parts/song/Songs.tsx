import React from 'react'
import { INF_Song } from '../../../misc/interfaces'
import Song from './Song'

const Songs = ({ songs, referBy, mode='def', search='', genre='' } : 
    { songs: INF_Song[], referBy: string, mode: 'def' | 'filter', search: string, genre: string }) => {

    if(mode === 'def')
        return <>{
            songs.map((song: INF_Song, idx: number) => (
                <Song song={song} key={song.id} idx={idx} ignore={false} queueType={null} referBy={referBy} />
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
                <Song song={song} key={song.id} idx={idx} ignore={false} queueType={null} referBy={referBy} />
        ))}</>
    else
        return(<></>)
}

export default Songs