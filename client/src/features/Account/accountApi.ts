import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { IUser } from "../../app/models/user";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['userInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<void, loginSchema>({
            query: (creds) => {
                return {
                    url: 'login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['userInfo']))
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_,{queryFulfilled}){
                try {
                    await queryFulfilled;
                    toast.success('Registration successful');
                    router.navigate('/login')
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo: builder.query<IUser, void>({
            query: () => 'account/user-info',
            providesTags: ['userInfo']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(['userInfo']));
                    router.navigate('/');

            }
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUserInfoQuery, useLazyUserInfoQuery } = accountApi;