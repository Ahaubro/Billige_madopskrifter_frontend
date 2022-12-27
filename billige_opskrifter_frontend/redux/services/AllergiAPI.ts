import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Importere createApi & fetchBaseQuery fra rtk (Der var vist et eksempel af dette i template projektet)
import { RootState } from '../store' // Importere RootState (Del af template projektet)

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
    }
})

// Definere dette API's type (Allergi)
export type Allergi = {
    id: number,
    userId: number,
    allergi: string
}

// Her bruges createApi der b.la. bruger baseQuery, tagTypes samt de endpoints der skal tilknyttes AllergiAPI
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

// Her eksporteres de endpoints som funktionelle komponenter
export const { useCreateAllergiMutation, useDeleteAllergiMutation, useGetAllergiesByUserIdQuery } = AllergiAPI

