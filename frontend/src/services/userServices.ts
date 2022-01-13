import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../misc/consts';
import { User, UserLogin } from '../misc/interfaces';

export const UserApi = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL + 'users',
        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
     }),
     endpoints: (builder) => ({
        login: builder.mutation<User, UserLogin>({
            query: (loginData) => ({
                url: 'login',
                method: 'POST',
                body: loginData
            }),
        }),

        signUp: builder.mutation<void, FormData>({
            query: (signUpData) => ({
                url: 'signup',
                method: 'POST',
                body: signUpData
            })
        })
     })
})

export const { useLoginMutation, useSignUpMutation } = UserApi;