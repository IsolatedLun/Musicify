import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';

const initialState: MusicState = {
    browseSongs: [],
    recentSongs: [],
    favoriteSongs: [],
    songsToPlay: [],
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
    currSongType: '',
}

export const fetchSongs = createAsyncThunk(
    'music/fetch-songs',
    async(thunk) => {
        const res: any = await axios.get(API_URL + 'songs');
        return res.data
    }
)

export const fetchRecentSongs = createAsyncThunk(
    'music/fetch-recent-songs',
    async(user_id: number, thunk) => {
        const res: any = await axios.get(API_URL + 'songs/recents/get/' + user_id);
        return res.data
    }
)

export const postRecentSong = createAsyncThunk(
    'music/post-recent-song',
    async(data: any, thunk) => {
        const res: any = await axios.post(API_URL + 'songs/recents/post/' + data.user_id + '/' + data.song_id);
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
            state.currSong = state.songsToPlay.filter(song => song.id === action.payload['id'])[0];
            state.currSongType = action.payload['referBy'];
        },

        setIndex(state, action) {
            state.currIdx = action.payload;
        },

        setSongsToPlay(state, action) {
            state.songsToPlay = action.payload;
        },

        setSongType(state, action) {
            state.currSongType = action.payload;

            if(state.currSongType === 'ref-browse') {
                state.songsToPlay = state.browseSongs
            }

            else if(state.currSongType === 'ref-recent') {
                state.songsToPlay = state.recentSongs
            }

            else if(state.currSongType === 'ref-favorites') {
                state.songsToPlay = state.favoriteSongs
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.browseSongs = action.payload;
            state.status = 'fulfilled';
        })


        builder.addCase(fetchSongs.rejected, (state, action) => {
            
        })

        builder.addCase(fetchRecentSongs.fulfilled, (state, action) => {
            state.recentSongs = action.payload['data']
        })
    }
})

export const { setCurrSong, setIndex, setSongsToPlay, setSongType } = musicSlice.actions;
export default musicSlice.reducer;