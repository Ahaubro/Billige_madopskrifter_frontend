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
    }
}