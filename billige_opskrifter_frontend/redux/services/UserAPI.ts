import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Importere createApi & fetchBaseQuery fra rtk (Der var vist et eksempel af dette i template projektet)
import { RootState } from '../store' // Import af RootState (Del af template projektet)

// Definere en baseQuery hvor der b.la. sættes baseUrl fra min .env fil
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState
    const token = state.session.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Her bruges createApi der b.la. bruger baseQuery, tagTypes samt de endpoints der skal tilknyttes ReviewAPI
export const UserAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery,
  endpoints: builder => ({

    //Login 
    login: builder.mutation<
      { id: number, fullName: string, token: string, statusText: string, email: string },
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

// Her eksporteres de endpoints som funktionelle komponenter
export const { useLoginMutation, useRegisterMutation } = UserAPI
