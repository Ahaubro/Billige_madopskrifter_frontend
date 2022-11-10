import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7102/user",
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
    login: builder.mutation<
      {
        id: string
        fullName: string
        token: string
        statusText: string

      },
      { email: string; password: string }
    >({
      query: body => ({
        url: '/authenticate',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = UserAPI
