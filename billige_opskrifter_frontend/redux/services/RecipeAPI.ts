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
    },
})

export type Recipe = {
    id: number,
    name: string,
    type: string,
    prepTime: number,
    numberOfPersons: number,
    estimatedPrice: number,
    description: string,
    userId: number
}

export const RecipeAPI = createApi({
    reducerPath: 'RecipeAPI',
    baseQuery,
    tagTypes: ["Recipe"],
    endpoints: builder => ({

        //Create recipe
        create: builder.mutation<
            { statusText: string, name: string },
            { name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }
        >({
            query: body => ({
                url: 'api/recipe/',
                method: 'POST',
                body
            }),
            invalidatesTags: ["Recipe"]
        }),

        //Get all recipes by userId
        getRecipesByUserId: builder.query<{ recipes: Recipe[] }, number>({
            query: userId => `api/recipe/byUserid/${userId}`,
            providesTags: ["Recipe"]
        }),

        //Get recipes by name and userId
        getRecipesByNameAndUserId: builder.query<{ id: number, name: string }, { userId: number, name: string }>({
            query: ({ userId, name }) => `api/recipe/getByNameAndUserId/${userId}/${name}`,
            providesTags: ["Recipe"]
        }),

        //Get recipes by type
        getRecipesByType: builder.query<{ recipes: Recipe[] }, string>({
            query: type => `api/recipe/getbytype/${type}`,
            providesTags: ["Recipe"]
        }),

        //Get recipe by id
        getRecipeById: builder.query<{ id: number, name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, description: string, userId: number }, number>({
            query: id => `api/recipe/${id}`,
            providesTags: ["Recipe"]
        }),

        //Search recipes by type and query
        searchRecipes: builder.query<{recipes: Recipe[] }, {type: string, query: string}>({
            query: ({type, query}) => `api/recipe/search/${type}/${query}`,
            providesTags: ["Recipe"]
        }),

        //Edit funktion til en opskrift
        editDescription: builder.mutation<
        { statusText: string },
        { id: number, description: string }
        >({
            query: body => ({
                url: `api/recipe/description/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ["Recipe"]
        }),

        //Edit funktion til en opskrift
        editRecipe: builder.mutation<
        { statusText: string },
        { id: number, name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, description: string, userId: number }
        >({
            query: body => ({
                url: `api/recipe/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ["Recipe"]
        }),

        //Delete recipe
        deleteRecipe: builder.mutation<
        {statusText: string},
        {recipeId: number}
        >({
            query: body => ({
                url: `api/recipe/${body.recipeId}`,
                method: 'DELETE',
                body
            }),
            invalidatesTags:["Recipe"]
        }),

        // LIKED RECIPES
        getLikedRecipesByUserId: builder.query<{recipes: Recipe[] }, {userId: number}>({
            query: userId => `api/recipe/search/${userId}`,
            providesTags: ["Recipe"]
        }),
    }),

})


export const { useCreateMutation, useGetRecipesByUserIdQuery, useGetRecipesByNameAndUserIdQuery, useGetRecipesByTypeQuery, useDeleteRecipeMutation, useSearchRecipesQuery, useGetRecipeByIdQuery, useEditRecipeMutation, useEditDescriptionMutation } = RecipeAPI