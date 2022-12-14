import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants'
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
    },   
})

export type Review = {
    id: number,
    userId: number,
    recipeId: number,
    content: string,
    rating: number
    
}

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

export const { useCreateMutation, useGetReviewsByRecipeIdQuery } = ReviewAPI