import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState } from '../misc/interfaces';
import axios from 'axios';

const initialState: MusicState = {
    songs: [],
    status: 'idle',
    currSong: {
        id: Infinity,
        title: 'No Music',
        author: 'No Author',
        views: 0,
        rating: 0,
        created_at: new Date(),
    }
}

export const fetchSongs = createAsyncThunk(
    'music/fetch-songs',
    async(thunk) => {
        const res: any = await axios.get('http://localhost:8000/api/songs');
        return res.data
    }
)

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
            state.status = 'fulfilled';
        })

        builder.addCase(fetchSongs.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const { } = musicSlice.actions;
export default musicSlice.reducer;