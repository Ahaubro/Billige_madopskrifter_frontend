import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Importere createApi & fetchBaseQuery fra rtk (Der var vist et eksempel af dette i template projektet)
import { RootState } from '../store' // Importere RootState (Del af templateprojektet)
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

// Definere dette API's type (Ingredient)
export type Ingredient = {
    id: number,
    recipeId: number,
    name: string,
    type: string,
    measurementUnit: string,
    amount: number,
    alergene: string
}

// Her bruges createApi der b.la. bruger baseQuery, tagTypes samt de endpoints der skal tilknyttes IngredientAPI
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
            }),
            invalidatesTags: ["Ingredient"]
        }),

        //Get ingredients by recipeId
        getByRecipeId: builder.query<{ingredients: Ingredient[]}, number>({
            query: recipeId => `api/ingredient/getbyrecipeid/${recipeId}`,
            providesTags: ["Ingredient"]
        }),

        //Delete ingredient
        deleteIngredient: builder.mutation<
        {statusText: string},
        {id: number}
        >({
            query: body => ({
                url: `api/ingredient/${body.id}`,
                method: 'DELETE',
                body
            }),
            invalidatesTags:["Ingredient"]
        }),

        //Search for ingredient
        searchIngredients: builder.query<{ingredients: Ingredient[]}, {search: string}> ({
            query: ({ search }) => `api/ingredient/search/${search}`,
            providesTags:["Ingredient"]
        }),

        //Search for ingredient by multiple names
        searchIngredientByMultipleNames: builder.query<{ingredients: Ingredient[]}, {searchList: string}> ({
            query: ({ searchList }) => `api/ingredient/searchlist/${searchList}`,
            providesTags:["Ingredient"]
        }),

        //Edit ingredient
        edit: builder.mutation<
        { statusText: string, name: string },
        { id: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }
        >({
            query: body => ({
                url: `api/ingredient/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ["Ingredient"]
        }),
        

    })
})

// Her eksporteres de endpoints som funktionelle komponenter
export const { useCreateMutation, useGetByRecipeIdQuery, useDeleteIngredientMutation, useSearchIngredientsQuery, useSearchIngredientByMultipleNamesQuery, useEditMutation } = IngredientAPI