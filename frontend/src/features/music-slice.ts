import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INF_Song, MusicState, } from '../misc/interfaces';
import { MusicApi } from '../services/musicService';

const initialState: MusicState = {
    songsToPlay: {},
    currSong: {},
    status: 'idle',

    currIdx: NaN,
    currSongType: '',
    selectedSong: {
        id: -1,
        type: 'null',
        referBy: 'ref-noReffer'
    },

    hasUploadedAlbum: false,
    hasUploadedSong: false,
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
        },

        setSelectedSong(state, action) {
            state.selectedSong = action.payload;
        },

        setUploadedSong(state, action) {
            state.hasUploadedSong = action.payload
        },

        setUploadedAlbum(state, action) {
            state.hasUploadedAlbum = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const { setCurrSong, setIndex, setSong, setSelectedSong,
    setSongType, setSongList, setUploadedAlbum, setUploadedSong } = musicSlice.actions;
export default musicSlice.reducer;