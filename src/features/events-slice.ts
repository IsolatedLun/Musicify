import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventState } from '../misc/interfaces';

const initialState: EventState = {
    isMouseDown: false,
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        toggleMouseDown: (state, action) => {
            state.isMouseDown = action.payload;
        }
    }
})

export const { toggleMouseDown } = eventSlice.actions;
export default eventSlice.reducer;