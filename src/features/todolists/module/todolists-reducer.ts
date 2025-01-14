import { FilterValuesType } from "../../../app/App"
import { type Todolist, todolistsApi } from "../api"
import { type RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import type { AppThunk } from "../../../app/store"
import { handleServerNetworkError } from "common/utils"
import { ResultCode } from "../lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

let unitialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = unitialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS":
      return action.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    case "REMOVE-TODOLIST":
      return state.filter(el => el.id !== action.payload.id)
    case "ADD-TODOLIST":
      const todo: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      return [todo, ...state]
    case "CHANGE-TODOLIST-TITLE":
      return state.map(el => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el))
    case "CHANGE-TODOLIST-FILTER":
      return state.map(el => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el))
    case "CHANGE_TODOLIST_ENTITY_STATUS":
      return state.map(el => (el.id === action.payload.id ? { ...el, entityStatus: action.payload.entityStatus } : el))
    default:
      return state
  }
}

// Thunk
export const fetchTodolistsTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then(res => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const removeTodolistTC =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
    todolistsApi
      .deleteTodolist(id)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolistAC(id))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        dispatch(setAppStatusAC("failed"))
        dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTodolistTitleTC =
  (arg: { id: string; title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .updateTodolist(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitleAC(arg))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
//actions
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id: todolistId,
    },
  } as const
}
export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload,
  } as const
}
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload,
  } as const
}
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET_TODOLISTS", todolists } as const
}
export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE_TODOLIST_ENTITY_STATUS", payload } as const
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusType
