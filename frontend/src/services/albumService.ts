import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../misc/consts";
import { INF_Album, INF_Song } from "../misc/interfaces";
import { getToken } from "../misc/utils";

export const AlbumApi = createApi({
    reducerPath: 'AlbumApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + 'albums', 
        prepareHeaders: (headers, { getState }) => {
            return headers
        }
    }),
    endpoints: (builder) => ({
        postNewAlbum: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: 'create',
                method: 'POST',
                headers: {
                    'authorization': getToken()
                },
                body: formData
            })
        }),

        getUserAlbums: builder.query<INF_Album[], void>({
            query: () => ({
                url: '',
                method: 'GET',
                headers: {
                    'authorization': getToken()
                }
            })
        }),

        getAlbumSongs: builder.query<INF_Song[], number>({
            query: (albumId) => ({
                url: `songs/${albumId}`,
                method: 'GET',
                
            })
        })

    })
})

export const { usePostNewAlbumMutation, useGetUserAlbumsQuery } = AlbumApi;