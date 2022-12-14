import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers, api) => {
        const state = api.getState() as RootState
        const token = state.session.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export type Allergi = {
    id: number,
    userId: number,
    allergi: string
}

export const AllergiAPI = createApi({
    reducerPath: 'AllergiAPI',
    baseQuery,
    tagTypes:['Allergi'],
    endpoints: builder => ({

        //Create allergi
        createAllergi: builder.mutation<
        {allergi: string, statusText: string}, 
        {userId: number, allergi: string}>
        ({
            query: body => ({
                url: 'api/allergi/',
                method: 'POST',
                body
            }),
            invalidatesTags:['Allergi']
        }),

        //Get allergies by userId
        getAllergiesByUserId: builder.query<{allergies: Allergi[]}, number>({
            query: userId => `api/allergi/${userId}`,
            providesTags:["Allergi"]
        }),

        //Delete allergi
        deleteAllergi: builder.mutation<{statusText: string},{id: number}>
        ({
            query: body => ({
                url: `api/allergi/${body.id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Allergi']
        })
    })
})

export const { useCreateAllergiMutation, useDeleteAllergiMutation, useGetAllergiesByUserIdQuery } = AllergiAPI

