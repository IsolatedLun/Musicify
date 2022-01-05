import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { fetchSongs } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks'
import { INF_Song } from '../misc/interfaces';
import Loader from './layout/Loader'
import Song from './parts/Song';

const Browse = () => {
    const { songs, status } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        if(songs.length < 1) {
            dispatch(fetchSongs());
        }
    }, [])

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearch((e.target as HTMLInputElement).value.toLowerCase());
    }

    const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
        setGenre((e.target as HTMLSelectElement).value.toLowerCase())
    }

    return (
        status === 'idle'
        ?
        <Loader />
        :
        <div className="browse-container" id='main-content'>
            <div className="browse__controls flex--align gap--1">

                <input id='search-inpt' type="text" placeholder='Search songs...' 
                    onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)} className='inpt--def input--primary' />

                <select id='genres-input' onInput={(e: FormEvent<HTMLSelectElement>) => handleSelect(e)}
                    className='input--select' name='Genres' onChange={() => null}>
                    <option value="all">All</option>
                    <option value="pop">Pop</option>
                    <option value="intrumental">Instrumental</option>
                    <option value="metal">Metal</option>
                    <option value="rap">Rap</option>
                </select>

            </div>

            <div className="songs">
                {
                    songs.filter(song => {
                        if(search.length > 0) {
                            if(song.title.toLowerCase().indexOf(search) > -1) {
                                return song;
                            }
                        }

                        else {
                            return song;
                        }
                    }).map((song: INF_Song, idx: number) => (
                        <Song song={song} key={song.id} idx={idx} ignore={false} queueType={null} />
                    ))
                }
            </div>

        </div>
    )
}

export default Browse
