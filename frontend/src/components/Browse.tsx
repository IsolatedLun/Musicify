import React, { FormEvent, useEffect, useState } from 'react';
import { setSongList } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Loader from './layout/Loader';
import Songs from './parts/song/Songs';
import Option from './parts/utils/Option';
import filters from './json/filters.json';
import { useGetSongsQuery } from '../services/musicService';
import { useAutoState } from '../hooks/useAutoState';
import { useFilters } from '../hooks/useFilters';
import { INF_Song } from '../misc/interfaces';
import Inputs, { InputProps } from './inputs/Inputs';
import Input from './inputs/Input';

const Browse = () => {
    const {data, isLoading, isFetching, isSuccess, refetch} = useGetSongsQuery();
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [itemType, setItemType] = useState('');

    const inputs: InputProps[] = [
        { inputType: 'select', label: 'genre', name: 'genre ', type: 'singleStr', 
            formPartCls: 'width-auto',
            id: 'song-genre-select', options: null, selectValues: filters.genres, disableLabel: true },
        { inputType: 'select', label: 'item type', name: 'itemType ', type: 'singleStr', 
            formPartCls: 'width-auto',
            id: 'item-type-select', options: null, selectValues: filters.itemTypes, disableLabel: true },
    ]

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
                    <input id='search-inpt' type="text" placeholder='Search melodies...' 
                        onInput={(e: FormEvent<HTMLInputElement>) => 
                            useAutoState(e, setSearch, '', 'singleStr')} 
                        className='inpt--def input--primary' />

                    <Input props={inputs[0]} />

                    <Input props={inputs[1]} />
                    
                    <button onClick={() => refetch()} name='refresh' 
                        aria-label='Refresh button' aria-hidden='true'
                        className='fa btn--def btn--primary round--50 p-05'>&#xf021;</button>
                </div>

                <div className="songs">
                    <Songs songs={useFilters(data as any[], { genre: genre }, search)} direction='vert'
                        editable={false} fallbackEl={<p>No songs found.</p>} referBy='ref-browse' />
                </div>

            </div>
        )
    else
        return(<></>)
}

export default Browse
