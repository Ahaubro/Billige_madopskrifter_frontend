import { Ingredient } from "../redux/services/IngredientAPI" // Import af min Ingredient type
import { Review } from "../redux/services/ReviewAPI" // Import af min Review type

//Der bliver nedenfor eksporteret de forskellige navigations typer samt hvilke props de sender mellem sig

// Eksportere min auth navigations parametre
export type AuthNavigationParameters = {
    Login: undefined,
    Welcome: undefined,
    Register: undefined
}

// Eksportere my page navigations parametre
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
        userId: number,
        recipeName: string,
    },
    AddAllergiScreen: undefined,
    AddExtraIngredientAfterCreationScreen:{
        recipeId: number
    },
    AllReviewsScreen: {
        reviews: Review[]
    }
}

// Eksportere recipe navigations parametre
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
        userId: number,
        recipeName: string,
    },
    AddIngredient: {
        name: string
    },
    AddExtraIngredientAfterCreationScreen: {
        recipeId: number
    },
    AllReviewsScreen: {
        reviews: Review[]
    }
}

// Eksportere home page navigations parametre
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
        userId: number,
        recipeName: string,
    },
    ChooseRecipe: undefined,
    RecipesScreen: {
        type: string
    },
    AllReviewsScreen: {
        reviews: Review[]
    },
    RecipeNavigator: undefined
}

// Eksportere ingredient search navigations parametre
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
        userId: number,
        recipeName: string,
    },
    AllReviewsScreen: {
        reviews: Review[]
    }
}


