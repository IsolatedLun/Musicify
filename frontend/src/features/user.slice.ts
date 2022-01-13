import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState, UserLogin } from '../misc/interfaces';
import axios from 'axios';
import { GET_TOKEN, HEADERS_FILE, POST_LOGIN, POST_SAVE, POST_SIGNUP } from '../misc/consts';
import { constructHeaders } from '../misc/utils';
import { popup } from '../misc/utils';

const initialState: UserState = {
    user: null,

    isLogged: false,
    isSignedUp: false,
    changesMade: false,
    doSave: false
}

export const login = createAsyncThunk(
    'user/auth-login',
    async(loginData: UserLogin, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(POST_LOGIN, { 
                email: loginData.email, password: loginData.password });
            return res.data;
        }

        catch(err: any) {
            popup(err.response.data['err'], 'err');
        }
    }
)

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

export const getUserByToken = createAsyncThunk(
    'user/auth-loginWithTok',
    async(thunk) => {
        const res: any = await axios.get(GET_TOKEN + localStorage.getItem('tok'));
        return res.data;
    }
)

export const signUp = createAsyncThunk(
    'user/auth-signup',
    async(newUserData: FormData, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(POST_SIGNUP, newUserData, {
                headers: { ...HEADERS_FILE }
            })
            
            return res.data;
        }


        catch(err: any) {
            popup(err.response.data['err'], 'err');
            return rejectWithValue(err.response.data['err']);
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
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload['user'];
            localStorage.setItem('tok', action.payload['tok']);
            state.isLogged = true;
            state.isSignedUp = false;
        })

        // Retrieve token 
        builder.addCase(getUserByToken.fulfilled, (state, action) => {
            state.user = action.payload['user'];
        })
        
        // Signup
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isSignedUp = true;
        })

        builder.addCase(signUp.rejected, (state, action) => {
            state.isSignedUp = false;
        })

        // Update
    }
})

export const { setIsLogged, logout, setChangesMade, setDoSave } = userSlice.actions;
export default userSlice.reducer;