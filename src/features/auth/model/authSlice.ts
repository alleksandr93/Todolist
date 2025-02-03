import type { Inputs } from "../ui/Login/Login"
import { authApi } from "../api/authApi"
import type { AppThunk, RootState } from "../../../app/store"
import { ResultCode } from "../../todolists/lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils"
import { createSlice } from "@reduxjs/toolkit"
import { setAppStatus } from "../../../app/appSlice"
import { clearTodolist } from "../../todolists/module/todolistsSlice"
import { clearTasks } from "../../todolists/module/tasksSlice"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsInitialized: state => state.isInitialized,
  },
})
export const authReducer = authSlice.reducer
const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
// thunks
export const loginTC =
  (data: Inputs): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
      .login(data)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          dispatch(setAppStatus({ status: "succeeded" }))
          // записываем токен в локал стордж
          localStorage.setItem("sn-token", res.data.data.token)
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatus({ status: "succeeded" }))
        // удаляем токен в локал стордж
        localStorage.removeItem("sn-token")
        dispatch(clearTasks())
        dispatch(clearTodolist())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))

        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => dispatch(setIsInitialized({ isInitialized: true })))
}
