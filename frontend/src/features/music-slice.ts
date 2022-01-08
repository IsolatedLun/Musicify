import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';

const initialState: MusicState = {
    songs: [],
    recentSongs: [],
    favoriteSongs: [],
    mainSongs: [],
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

    currIdx: NaN,
    currRefer: '',
}

export const fetchSongs = createAsyncThunk(
    'music/fetch-songs',
    async(thunk) => {
        const res: any = await axios.get(API_URL + 'songs');
        return res.data
    }
)

export const fetchRecentSongs = createAsyncThunk(
    'music/fetch-songs',
    async(user_id: number, thunk) => {
        const res: any = await axios.get(API_URL + 'songs/recents/get/' + user_id);
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
            state.currSong = state.songs.filter(song => song.id === action.payload['id'])[0];
            state.currRefer = action.payload['referBy'];
        },

        setIndex(state, action) {
            state.currIdx = action.payload;
        },

        setMainSongs(state, action) {
            state.mainSongs = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
            state.status = 'fulfilled';
        })

        builder.addCase(fetchSongs.rejected, (state, action) => {
            
        })
    }
})

export const { setCurrSong, setIndex, setMainSongs } = musicSlice.actions;
export default musicSlice.reducer;