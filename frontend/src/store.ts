import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";;
import musicSlice from "./features/music-slice";
import userSlice from "./features/user.slice";
import utilsSlice from "./features/utils-slice";
import { UserApi } from "./services/userServices";

export const store = configureStore({
    reducer: {
        music: musicSlice,
        user: userSlice,
        utils: utilsSlice,
        [UserApi.reducerPath]: UserApi.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch