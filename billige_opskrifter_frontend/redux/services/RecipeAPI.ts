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


export type Recipe = {
    id: number,
    name: string,
    type: string,
    prepTime: number,
    numberOfPersons: number,
    estimatedPrice: number,
    userId: number
}


export const RecipeAPI = createApi({
    reducerPath: 'RecipeAPI',
    baseQuery,
    endpoints: builder => ({

        //Create
        create: builder.mutation<
            { statusText: string, name: string },
            { name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }
        >({
            query: body => ({
                url: 'api/recipe',
                method: 'POST',
                body
            })
        }),

        //Get all recipes
        getRecipesByUserId: builder.query<{ recipes: Recipe[] }, number>({
            query: userId => `api/recipe/byUserid/${userId}`,
        }),

    }),
})

export const { useCreateMutation, useGetRecipesByUserIdQuery } = RecipeAPI