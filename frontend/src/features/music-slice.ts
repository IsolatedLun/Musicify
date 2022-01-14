import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState, } from '../misc/interfaces';
import axios from 'axios';
import { GET_RECENTS, GET_SONG, GET_SONGS, POST_RECENTS, POST_UPLOAD } from '../misc/consts';
import { constructHeaders, popup } from '../misc/utils';
import { MusicApi } from '../services/musicService';

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

export const postRecentSong = createAsyncThunk(
    'music/post-recent-song',
    async(data: any, thunk) => {
        const res: any = await axios.post(POST_RECENTS + data.songId, {}, {
            headers: { ...constructHeaders(false, true) }
        });

        return res.data;
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

            if(state.currSongType === 'ref-browse')
                state.songsToPlay = state.browseSongs

            else if(state.currSongType === 'ref-recent')
                state.songsToPlay = state.recentSongs

            else if(state.currSongType === 'ref-favorites')
                state.songsToPlay = state.favoriteSongs
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(MusicApi.endpoints.getRecentSongs.matchFulfilled, (state, action) => {
            state.recentSongs = (action.payload as any)['data'];
        })

        builder.addMatcher(MusicApi.endpoints.getSongs.matchFulfilled, (state, action) => {
            state.browseSongs = action.payload;
            state.status = 'fulfilled';
        })
    }
})

export const { setCurrSong, setIndex, setSongsToPlay, setSongType } = musicSlice.actions;
export default musicSlice.reducer;