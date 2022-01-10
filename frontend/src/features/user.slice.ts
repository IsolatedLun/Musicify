import { createSlice, PayloadAction, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { INF_Song, MusicState, UserState, User, UserForm, UserLogin } from '../misc/interfaces';
import axios from 'axios';
import { API_URL } from '../misc/consts';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { popup } from '../misc/utils';

const initialState: UserState = {
    user: null,

    isLogged: false,
    isSignedUp: false,
}

export const login = createAsyncThunk(
    'user/auth-login',
    async(loginData: UserLogin, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(API_URL + 'users/login', { 
                email: loginData.email, password: loginData.password });
            return res.data;
        }

        catch(err: any) {
            popup(err.response.data['err'], 'err');
            return rejectWithValue(err.response.data['err'])
        }
    }
)

export const getUserByToken = createAsyncThunk(
    'user/auth-loginWithTok',
    async(thunk) => {
        const res: any = await axios.get(API_URL + 'users/tok/' + localStorage.getItem('tok'));
        return res.data;
    }
)

export const signUp = createAsyncThunk(
    'user/auth-signup',
    async(newUserData: FormData, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(API_URL + 'users/signup', newUserData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return res.data
        }

        catch(err: any) {
            popup(err.response.data['err'], 'err');
            return rejectWithValue(err.response.data['err'])
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload['user'];
            localStorage.setItem('tok', action.payload['tok']);
            state.isLogged = true;
            state.isSignedUp = false;
        })

        builder.addCase(login.rejected, (state, action) => {
            
        })

        builder.addCase(getUserByToken.fulfilled, (state, action) => {
            state.user = action.payload['user'];
        })

        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isSignedUp = true;
        })
    }
})

export const { setIsLogged, logout } = userSlice.actions;
export default userSlice.reducer;