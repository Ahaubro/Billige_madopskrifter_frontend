import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Importere createApi & fetchBaseQuery fra rtk (Der var vist et eksempel af dette i template projektet)
import { RootState } from '../store' // Import af RootState (Del af template projektet)
import { API_URL } from '../../constants' // Imortere API_URL fra constants.ts

// Definere en baseQuery hvor der b.la. sættes baseUrl fra min .env fil
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

// Definere dette API's type (Review)
export type Review = {
    id: number,
    userId: number,
    recipeId: number,
    content: string,
    rating: number
    
}

// Her bruges createApi der b.la. bruger baseQuery, tagTypes samt de endpoints der skal tilknyttes ReviewAPI
export const ReviewAPI = createApi({
    reducerPath: 'ReviewAPI',
    baseQuery,
    tagTypes: ["Review"],
    endpoints: builder => ({

        //Create review
        create: builder.mutation<
        {statusText: string },
        {userId: number, recipeId: number, content: string, rating: number}>
        ({
            query: body => ({
                url: "api/review",
                method: 'POST',
                body
            }),
            invalidatesTags: ["Review"]
        }),

        //Get reviews by recipeId
        getReviewsByRecipeId: builder.query<{reviews: Review[]}, number>({
            query: recipeId => `api/review/getByrecipeId/${recipeId}`,
            providesTags: ["Review"]
        })

    })
})

// Her eksporteres de endpoints som funktionelle komponenter
export const { useCreateMutation, useGetReviewsByRecipeIdQuery } = ReviewAPI