// Denne fil var en del af template projektet, jeg har kun tilføjet fullName og email til den allerede eksisterende session
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
  id: number
  token?: string
  fullName?: string
  email?: string
  isLoading: boolean
}

const initialState: SessionState = {
  token: undefined,
  id: 0,
  fullName: undefined,
  email: undefined,
  isLoading: true,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (
      state: SessionState,
      action: PayloadAction<{
        id: number
        token: string
        fullName: string
        email: string
      }>
    ) => {
      state.id = action.payload.id
      state.token = action.payload.token
      state.fullName = action.payload.fullName
      state.email = action.payload.email
      state.isLoading = false
    },
    endSession: (state: SessionState) => {
      state.id = initialState.id
      state.token = initialState.token
      state.fullName = initialState.fullName
      state.email = initialState.email
    },
    setSessionLoading: (
      state: SessionState,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      state.isLoading = action.payload.isLoading
    },
    // Below is often used for refresh tokens (check MIO)
    // updateTokens: (
    //   state,
    //   action: PayloadAction<{
    //     token: string
    //   }>
    // ) => {
    //   state.token = action.payload.token

    //   window.localStorage.setItem('token', action.payload.token)
    // },
  },
})

export const { startSession, endSession, setSessionLoading } =
  sessionSlice.actions

export default sessionSlice.reducer
