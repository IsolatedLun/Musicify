import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Song, MusicState } from '../misc/interfaces';
import axios from 'axios';

const initialState: MusicState = {
    songs: [],
    status: 'idle'
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