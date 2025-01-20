import type { Inputs } from "../ui/Login/Login"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import type { AppThunk } from "../../../app/store"
import { ResultCode } from "../../todolists/lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.payload.isInitialized }
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "SET_IS_INITIALIZED",
    payload: { isInitialized },
  } as const
}
// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC =
  (data: Inputs): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"))
    authApi
      .login(data)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setAppStatusAC("succeeded"))
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
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
        // записываем токен в локал стордж
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))

        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => dispatch(setIsInitializedAC(true)))
}
