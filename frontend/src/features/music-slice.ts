import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INF_Song, MusicState, } from '../misc/interfaces';
import { MusicApi } from '../services/musicService';

const initialState: MusicState = {
    songsToPlay: {},
    currSong: {},
    status: 'idle',

    currIdx: NaN,
    currSongType: '',
}

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrSong(state, action) {
            
            state.currSongType = action.payload['referBy'];
        },

        setIndex(state, action) {
            state.currIdx = action.payload;
        },

        setSong(state, action) {
            const song: INF_Song = 
                Object.assign({}, state.songsToPlay[action.payload['songKey']][action.payload['idx']]);
                
            state.currSong = song;
        },

        setSongType(state, action) {
            state.currSongType = action.payload;
        },

        setSongList(state, action) {
            state.songsToPlay[action.payload['songKey']] = action.payload['data'];
        }
    },
    extraReducers: (builder) => {
    }
})

export const { setCurrSong, setIndex, setSong, setSongType, setSongList } = musicSlice.actions;
export default musicSlice.reducer;