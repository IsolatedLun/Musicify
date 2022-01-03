import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';

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
        const res: any = await axios.get(API_URL + 'songs');
        return res.data
    }
)

export const fetchAudio = createAsyncThunk(
    'music/fetch-audio',
    async(id: number, thunk) => {
        const res: any = await axios.get(API_URL + 'songs/audio' + id);
        return res.data
    }
)

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrSong(state, action) {
            state.currSong = state.songs[action.payload];
        }
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

export const { setCurrSong } = musicSlice.actions;
export default musicSlice.reducer;