import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Importere createApi & fetchBaseQuery fra rtk (Der var vist et eksempel af dette i template projektet)
import { RootState } from '../store' // Import af RootState (Del af template projektet)
import { Recipe } from './RecipeAPI' // Import af Recipe typen fra RecipeAPI
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

// Definere dette API's type (LikedRecipe)
export type LikedRecipe = {
    id: number, 
    userId: number,
    recipeId: number,
    statusText: string
}

// Her bruges createApi der b.la. bruger baseQuery, tagTypes samt de endpoints der skal tilknyttes LikedRecAPI
export const LikedRecAPI = createApi({
    reducerPath: 'LikedRecAPI',
    baseQuery,
    tagTypes: ["LikedRecipe"],
    endpoints: builder => ({

        // get liked recipes
        getLikedRecipesByUserId: builder.query<{recipes: Recipe[] }, number>({
            query: userId => `api/likedRecipes/${userId}`,
            providesTags:["LikedRecipe"]
        }),

        // Like / unlike recipe
        addLikedRecipe: builder.mutation<
            { statusText: string },
            { userId: number, recipeId: number }
        >({
            query: body => ({
                url: 'api/likedRecipes/',
                method: 'POST',
                body
            }),
            invalidatesTags:["LikedRecipe"]
        }),

        //Check if recipe is liked
        likeCheck: builder.query<{ id: number, userId: number, recipeId: number, statusText: string }, {userId: number, recipeId: number}>({
            query: ({userId, recipeId}) => `api/likedRecipes/byuseridandrecipeid/${userId}/${recipeId}`,
            providesTags:["LikedRecipe"]
        }),
    }),

})

// Her eksporteres de endpoints som funktionelle komponenter
export const { useGetLikedRecipesByUserIdQuery, useAddLikedRecipeMutation, useLikeCheckQuery } = LikedRecAPI