import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { INF_Song, MusicState, UserState, User, UserForm, UserLogin } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const initialState: UserState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        bandName: '',
        isSuperUser: false
    },

    isLogged: false,
    isSignedUp: false,
}

export const login = createAsyncThunk(
    'user/auth-login',
    async(loginData: UserLogin, thunk) => {
        const res: any = await axios.post(API_URL + 'users/tok', { 
            username: loginData.email, password: loginData.password });
        return res.data
    }
)

export const signUp = createAsyncThunk(
    'user/auth-signup',
    async(newUserData: UserForm, thunk) => {
        const res: any = await axios.post(API_URL + 'users/signup', { data: newUserData });
        return res.data
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('tok', action.payload)
            state.isLogged = true;
        })

        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isSignedUp = true;
        })
    }
})

export const { setIsLogged } = userSlice.actions;
export default userSlice.reducer;