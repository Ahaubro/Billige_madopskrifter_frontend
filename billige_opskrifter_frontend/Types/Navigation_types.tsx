import { Ingredient } from "../redux/services/IngredientAPI"

export type AuthNavigationParameters = {
    Login: undefined,
    Welcome: undefined,
    Register: undefined
}

export type MyPageNavigationParameters = {
    CreateRecipe: {
        userId: number
    },
    MyPage: undefined,
    Settings: undefined,
    AddIngredient: {
        name: string
    },
    AddRecipeDescription: {
        recipeId: number
    },
    SelectedRecipeScreen: {
        id: number,
        name: string,
        type: string,
        prepTime: number,
        estimatedPrice: number,
        numberOfPersons: number,
        description: string,
        userId: number,
    },
    CreateReviewScreen:{
        id: number,
        userId: number
    },
    AddAllergiScreen: undefined,
    AddExtraIngredientAfterCreationScreen:{
        recipeId: number
    }
}

export type RecipeNavigationParameters = {
    ChooseRecipe: undefined,
    RecipesScreen: {
        type: string
    },
    SelectedRecipeScreen: {
        id: number,
        name: string,
        type: string,
        prepTime: number,
        estimatedPrice: number,
        numberOfPersons: number,
        description: string,
        userId: number,
    },
    CreateReviewScreen:{
        id: number,
        userId: number
    },
    AddIngredient: {
        name: string
    },
    AddExtraIngredientAfterCreationScreen: {
        recipeId: number
    }
}

export type HomeNavigationParameters = {
    HomeScreen: undefined,
    SelectedRecipeScreen: {
        id: number,
        name: string,
        type: string,
        prepTime: number,
        estimatedPrice: number,
        numberOfPersons: number,
        description: string,
        userId: number,
    },
    AddExtraIngredientAfterCreationScreen: {
        recipeId: number
    },
    CreateReviewScreen:{
        id: number,
        userId: number
    },
}


export type IngredientSearchNavigationParameters = {
    IngredientSearchScreen: undefined
    IngredientSearchResultScreen: {
        ingredients: Ingredient[]
    },
    SelectedRecipeScreen: {
        id: number,
        name: string,
        type: string,
        prepTime: number,
        estimatedPrice: number,
        numberOfPersons: number,
        description: string,
        userId: number,
    },
    AddExtraIngredientAfterCreationScreen: {
        recipeId: number
    },
    CreateReviewScreen:{
        id: number,
        userId: number
    },
}


