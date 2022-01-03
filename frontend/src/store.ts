import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import eventReducer from "./features/events-slice";
import musicSlice from "./features/music-slice";

export const store = configureStore({
    reducer: {
        events: eventReducer,
        music: musicSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch