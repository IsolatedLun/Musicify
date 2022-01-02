import React, { useEffect } from 'react'
import { fetchSongs } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks'
import Loader from './layout/Loader'

const Browse = () => {
    const { songs, status } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSongs());
    }, [])

    return (
        status === 'idle'
        ?
        <Loader />
        :
        <h1>{ songs[0].author }</h1>
    )
}

export default Browse
