// Denne fil var en del af template projektet - Jeg har kun tilføjet reducer samt middleware til hver af mine frontend API'er
import { configureStore } from '@reduxjs/toolkit'
import { UserAPI } from './services/UserAPI'
import sessionReducer from './slices/sessionSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger'
import { RecipeAPI } from './services/RecipeAPI'
import { IngredientAPI } from "./services/IngredientAPI"
import { ReviewAPI } from './services/ReviewAPI'
import { LikedRecAPI } from './services/LikedRecAPI'
import { AllergiAPI } from './services/AllergiAPI'

const store = configureStore({
  reducer: {
    session: sessionReducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [RecipeAPI.reducerPath]: RecipeAPI.reducer,
    [IngredientAPI.reducerPath]: IngredientAPI.reducer,
    [ReviewAPI.reducerPath]: ReviewAPI.reducer,
    [LikedRecAPI.reducerPath]: LikedRecAPI.reducer,
    [AllergiAPI.reducerPath]: AllergiAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([UserAPI.middleware, RecipeAPI.middleware, IngredientAPI.middleware, ReviewAPI.middleware, LikedRecAPI.middleware, AllergiAPI.middleware, rtkQueryErrorLogger]),
    
})
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
