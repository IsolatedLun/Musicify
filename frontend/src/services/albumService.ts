import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";
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
        })

    })
})

export const { usePostNewAlbumMutation } = AlbumApi;