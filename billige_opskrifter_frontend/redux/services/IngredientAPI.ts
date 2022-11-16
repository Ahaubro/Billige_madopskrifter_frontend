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

export type Ingredient = {
    id: number,
    recipeId: number,
    name: string,
    type: string,
    measurementUnit: string,
    amount: number,
    alergene: string
}

export const IngredientAPI = createApi({
    reducerPath: 'IngredientAPI',
    baseQuery,
    tagTypes: ["Ingredient"],
    endpoints: builder => ({

        //Create ingredient
        create: builder.mutation<
        {name: string, statusText: string },
        {recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string}>
        ({
            query: body => ({
                url: "api/ingredient",
                method: 'POST',
                body
            })
        }),

        //Get ingredients by recipeId
        getByRecipeId: builder.query<{ingredients: Ingredient[]}, number>({
            query: recipeId => `api/ingredient/getbyrecipeid/${recipeId}`,
            providesTags: ["Ingredient"]
        })

    })
})

export const { useCreateMutation, useGetByRecipeIdQuery } = IngredientAPI