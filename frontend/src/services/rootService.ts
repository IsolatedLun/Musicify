import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../misc/consts';

export const rootApi = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
     }),
     endpoints: (builder) => ({
        postDeleteItem: builder.mutation<void, any>({
            query: ({ id, type }) => ({
                url: `delete/${id}`,
                method: 'POST',
                body: { type: type }
            })
        })
     })
})

export const { usePostDeleteItemMutation } = rootApi;
