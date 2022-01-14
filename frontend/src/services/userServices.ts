import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../misc/consts';
import { User, UserLogin } from '../misc/interfaces';
import { constructHeaders } from '../misc/utils';

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
        }),

        updateUserInfo: builder.mutation<void, FormData>({
            query: (updatedData) => ({
                url: 'update',
                method: 'POST',
                headers: { 
                    'authorization': 'Token ' + localStorage.getItem('tok'),
                 },
                body: updatedData
            })
        }),

        getUserByTok: builder.mutation<User, void>({
            query: () => ({
                url: 'token',
                method: 'GET',
                headers: {
                    'authorization': 'Token ' + localStorage.getItem('tok')!
                }
            })
        })
     })
})

export const { useLoginMutation, useSignUpMutation, useGetUserByTokMutation, useUpdateUserInfoMutation } = UserApi;

// Functions
