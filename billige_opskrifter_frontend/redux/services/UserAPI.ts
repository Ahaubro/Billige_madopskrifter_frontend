import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState
    const token = state.session.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})


export const UserAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery,
  endpoints: builder => ({

    //Login 
    login: builder.mutation<
      { id: number, fullName: string, token: string, statusText: string },
      { email: string, password: string }
    >({
      query: body => ({
        url: 'user/authenticate',
        method: 'POST',
        body,
      }),
    }),

    //Register
    register: builder.mutation<
      { statusText: string },
      { fullName: string, email: string, password: string }
    >({
      query: body => ({
        url: '/user',
        method: 'POST',
        body
      })
    }),
  }),

})

export const { useLoginMutation, useRegisterMutation } = UserAPI
