import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';

const initialState: MusicState = {
    songs: [],
    status: 'idle',
    currSong: {
        id: null,
        title: 'No Music',
        author: 'No Author',
        views: 0,
        genre: 'all',
        rating: 0,
        created_at: new Date(),
    },

    currAudio: null,
    currIdx: NaN
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
        const res: any = await axios.get(API_URL + 'songs/audio/' + id);
        return res.data
    }
)

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrSong(state, action) {
            state.currSong = state.songs.filter(song => song.id === action.payload)[0];
        },

        setIndex(state, action) {
            state.currIdx = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
            state.status = 'fulfilled';
        })

        builder.addCase(fetchSongs.rejected, (state, action) => {
            
        })

        builder.addCase(fetchAudio.fulfilled, (state, action) => {
            state.currAudio = action.payload
        })
    }
})

export const { setCurrSong, setIndex } = musicSlice.actions;
export default musicSlice.reducer;