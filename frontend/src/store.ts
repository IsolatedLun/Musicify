import { configureStore } from "@reduxjs/toolkit";;
import musicSlice from "./features/music-slice";
import userSlice from "./features/user.slice";
import utilsSlice from "./features/utils-slice";
import { AlbumApi } from "./services/albumService";
import { MusicApi } from "./services/musicService";
import { UserApi } from "./services/userServices";

export const store = configureStore({
    reducer: {
        music: musicSlice,
        user: userSlice,
        utils: utilsSlice,
        [UserApi.reducerPath]: UserApi.reducer,
        [MusicApi.reducerPath]: MusicApi.reducer,
        [AlbumApi.reducerPath]: AlbumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(UserApi.middleware, MusicApi.middleware, AlbumApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch