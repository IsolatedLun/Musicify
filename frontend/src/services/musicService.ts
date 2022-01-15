import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";
import { getToken } from "../misc/utils";

export const MusicApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + 'songs',
        prepareHeaders: (headers, { getState }) => {
            return headers
        }
    }),
    endpoints: (builder) => ({
        getSongs: builder.query<INF_Song[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            })
        }),

        getRecentSongs: builder.query<INF_Song[], void>({
            query: () => ({
                url: 'recents/get',
                method: 'GET',
                headers: {
                    'authorization': getToken()
                }
            })
        }),

        uploadSong: builder.mutation<void, FormData>({
            query: (songData) => ({
                url: 'upload',
                method: 'POST',
                headers: {
                    'authorization': getToken()
                },
                body: songData
            })
        }),

        updateRecentSong: builder.mutation<void, number>({
            query: (songId) => ({
                url: `recents/post/${songId}`,
                method: 'POST',
                headers: {
                    'authorization': getToken()
                }
            })
        }),

        getUploadedSongs: builder.query<INF_Song[], void>({
            query: () => ({
                url: 'uploads/user',
                method: 'GET',
                headers: {
                    'authorization': getToken()
                }
            })
        })

    })
})

export const { useGetSongsQuery, useGetRecentSongsQuery, useUploadSongMutation, 
    useUpdateRecentSongMutation, useGetUploadedSongsQuery } = MusicApi;