import React, { FormEvent, useEffect, useState } from 'react';
import { setSongList } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Loader from './layout/Loader';
import Songs from './parts/song/Songs';
import Option from './parts/utils/Option';
import songGenres from './json/genres.json';
import { useGetSongsQuery } from '../services/musicService';
import { useAutoState } from '../hooks/useAutoState';

const Browse = () => {
    const {data, isLoading, isFetching, isSuccess} = useGetSongsQuery();
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearch((e.target as HTMLInputElement).value.toLowerCase());
    }

    const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
        setGenre((e.target as HTMLSelectElement).value.toLowerCase())
    }

    useEffect(() => {
        if(data && data.length > 0) {
            dispatch(setSongList({songKey: 'ref-browse', data}));
        }
    }, [isFetching])

    if(isLoading)
       return (<Loader text='Loading songs...'/>) 
    
    else if(isSuccess)
        return (
            <div className="browse-container" id='main-content'>
                <div className="browse__controls flex--align gap--1">
                    <input id='search-inpt' type="text" placeholder='Search songs...' 
                        onInput={(e: FormEvent<HTMLInputElement>) => 
                            useAutoState(e, setSearch, '', 'string')} 
                        className='inpt--def input--primary' />

                    <select id='genres-input' 
                        onChange={(e: FormEvent<HTMLSelectElement>) =>
                            useAutoState(e, setGenre, '', 'string')}
                        className='input--select' name='Genres'>
                        {
                        songGenres.map((genre, key) => (
                            <Option key={key} val={genre}/>
                        ))
                        }
                    </select>
                </div>

                <div className="songs">
                    <Songs songs={data} referBy='ref-browse' mode='filter' direction='vert'
                    genre={genre} search={search} fallbackEl={<Loader text='Loading songs'/>} />
                </div>

            </div>
        )
}

export default Browse
