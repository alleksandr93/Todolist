import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../../../app/App"
import { type Todolist, todolistsApi } from "../api"
import type { Dispatch } from "redux"
import type { AppDispatch, AppThunk } from "../../../app"
import type { ThunkDispatch } from "redux-thunk"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

let unitialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = unitialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS":
      return action.todolists.map(tl => ({ ...tl, filter: "all" }))
    case "REMOVE-TODOLIST":
      return state.filter(el => el.id !== action.payload.id)
    case "ADD-TODOLIST":
      const todo: DomainTodolist = { ...action.payload.todolist, filter: "all" }
      return [todo, ...state]
    case "CHANGE-TODOLIST-TITLE":
      return state.map(el => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el))
    case "CHANGE-TODOLIST-FILTER":
      return state.map(el => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el))
    default:
      return state
  }
}

// Thunk
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then(res => {
    console.log(res.data.data.item)
    dispatch(addTodolistAC(res.data.data.item))
  })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then(res => {
    dispatch(removeTodolistAC(id))
  })
}
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(arg).then(res => {
    dispatch(changeTodolistTitleAC(arg))
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
//thunks
export const fetchTodolistsTC = (): AppThunk => dispatch => {
  todolistsApi.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data))
  })
}
//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
