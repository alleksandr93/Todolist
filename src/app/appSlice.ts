import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { taskApi, todolistApi } from "../features/todolists/api"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: create => ({
    changeTheme: create.reducer<{ theme: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.theme
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setTheme: create.reducer<{ theme: ThemeMode }>((state, action) => {
      if (action.payload) state.themeMode = action.payload.theme
    }),
  }),
  extraReducers: builder => {
    builder.addMatcher(isPending, (state, action) => {
      if (todolistApi.endpoints.getTodolists.matchPending(action) || taskApi.endpoints.getTasks.matchPending(action)) {
        return
      }
      state.status = "loading"
    })
    builder.addMatcher(isFulfilled, state => {
      state.status = "succeeded"
    })
    builder.addMatcher(isRejected, state => {
      state.status = "failed"
    })
  },
  selectors: {
    selectAppError: state => state.error,
    selectStatus: state => state.status,
    selectThemeMode: state => state.themeMode,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})
export const appReducer = appSlice.reducer
export const { changeTheme, setAppError, setAppStatus, setIsLoggedIn, setTheme } = appSlice.actions
export const { selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export type ThemeMode = "dark" | "light"
