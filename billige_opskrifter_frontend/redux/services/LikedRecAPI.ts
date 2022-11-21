import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants'
import { RootState } from '../store'
import { Recipe } from './RecipeAPI'

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.1.226:5001/",
    prepareHeaders: (headers, api) => {
        const state = api.getState() as RootState
        const token = state.session.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})


export type LikedRecipe = {
    id: number, 
    userId: number,
    recipeId: number,
    statusText: string
}


export const LikedRecAPI = createApi({
    reducerPath: 'LikedRecAPI',
    baseQuery,
    tagTypes: ["LikedRecipe"],
    endpoints: builder => ({

        // LIKED RECIPES
        getLikedRecipesByUserId: builder.query<{recipes: Recipe[] }, number>({
            query: userId => `api/likedRecipes/${userId}`,
            providesTags:["LikedRecipe"]
        }),

        //Add liked recipe
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


export const { useGetLikedRecipesByUserIdQuery, useAddLikedRecipeMutation, useLikeCheckQuery } = LikedRecAPI