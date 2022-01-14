import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from '../misc/interfaces';
import axios from 'axios';
import { constructHeaders } from '../misc/utils';
import { popup } from '../misc/utils';
import { UserApi } from '../services/userServices';
import { POST_SAVE } from '../misc/consts';

const initialState: UserState = {
    user: null,

    isLogged: false,
    isSignedUp: false,
    changesMade: false,
    doSave: false
}

export const save = createAsyncThunk(
    'users/save-changes',
    async(updatedUser: FormData, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(POST_SAVE, updatedUser, {
                headers: { ...constructHeaders(true, true) }
            }) 
        }

        catch(err: any) {
            popup(err.response.data['err'], 'err');
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogged(state) {
            if(localStorage.getItem('tok')?.length! > 0) {
                state.isLogged = true;
            }

            else {
                state.isLogged = false;
            }
        },

        logout(state) {
            localStorage.removeItem('tok');

            state.isLogged = false;
            state.isSignedUp = false;
            state.user = null;
        },

        setChangesMade(state, action) {
            state.changesMade = action.payload;
        },

        setDoSave(state, action) {
            state.doSave = action.payload;
        },
        
        saveChanges(state, action) {
            state.doSave = false;
            state.changesMade = false;
        },

        setCredentails(state, action) {
            state.user = action.payload['user'];
            localStorage.setItem('tok', action.payload['tok']);
            state.isLogged = true;
            state.isSignedUp = false;
        },
    },
    extraReducers: (builder) => {
        // Login

        // Retrieve token 
        builder.addMatcher(UserApi.endpoints.getUserByTok.matchFulfilled, (state, action) => {
            state.user = (action.payload as any)['user'];
            state.isLogged = true;
        })
        
        // Signup

        // Update
    }
})

export const { setIsLogged, logout, setChangesMade, setDoSave, setCredentails } = userSlice.actions;
export default userSlice.reducer;