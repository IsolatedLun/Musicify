import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import { UtilsState } from '../misc/interfaces';

const initialState: UtilsState = {
    loc: '/',
    
} 

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        setLocation(state, action) {
            state.loc = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const { setLocation } = utilsSlice.actions;
export default utilsSlice.reducer;