import React, { FormEvent, useEffect, useState } from 'react';
import { setSongsToPlay } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Loader from './layout/Loader';
import Songs from './parts/song/Songs';
import Option from './parts/utils/Option';
import songGenres from './json/genres.json';
import { useGetSongsQuery } from '../services/musicService';

const Browse = () => {
    const { browseSongs, status } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');

    useEffect(() => {
        dispatch(setSongsToPlay(browseSongs));
    }, [status])

    useGetSongsQuery();

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearch((e.target as HTMLInputElement).value.toLowerCase());
    }

    const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
        setGenre((e.target as HTMLSelectElement).value.toLowerCase())
    }

    return (
        status === 'idle'
        ?
        <Loader text='Loading songs...' />
        :
        <div className="browse-container" id='main-content'>
            <div className="browse__controls flex--align gap--1">
                <input id='search-inpt' type="text" placeholder='Search songs...' 
                    onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)} className='inpt--def input--primary' />

                <select id='genres-input' onChange={(e: FormEvent<HTMLSelectElement>) => handleSelect(e)}
                    className='input--select' name='Genres'>
                    {
                    songGenres.map(genre => (
                        <Option val={genre}/>
                    ))
                    }
                </select>
            </div>

            <div className="songs">
                <Songs songs={browseSongs} referBy='ref-browse' mode='filter' genre={genre} search={search} />
            </div>

        </div>
    )
}

export default Browse
