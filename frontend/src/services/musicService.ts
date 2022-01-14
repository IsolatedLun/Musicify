import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";

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
                    'authorization': 'Token ' + localStorage.getItem('tok')
                }
            })
        })

    })
})

export const { useGetSongsQuery, useGetRecentSongsQuery } = MusicApi;