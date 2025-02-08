import { FilterValuesType } from "../../../app/App"
import { type Todolist, _todolistsApi } from "../api"
import { setAppStatus, type RequestStatus } from "../../../app/appSlice"
import type { AppThunk } from "../../../app/store"
import { handleServerNetworkError } from "common/utils"
import { ResultCode } from "../lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { fetchTasksTC } from "./tasksSlice"
import { createSlice } from "@reduxjs/toolkit"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  // в будущем лучше создавать объектБ а не массив чтобы потом не переписывать лишний раз
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find(todos => todos.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }),
    clearTodolist: create.reducer(state => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: state => state,
  },
})
export const todolistsReducer = todolistsSlice.reducer
export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  clearTodolist,
  setTodolists,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
// Thunk
export const fetchTodolistsTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: "loading" }))
  _todolistsApi
    .getTodolists()
    .then(res => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then(res => res.forEach(e => dispatch(fetchTasksTC(e.id))))
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    _todolistsApi
      .createTodolist(title)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({ todolist: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
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
    dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
    _todolistsApi
      .deleteTodolist(id)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolist({ todolistId: id }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        dispatch(setAppStatus({ status: "failed" }))
        dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }))
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTodolistTitleTC =
  (arg: { id: string; title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    _todolistsApi
      .updateTodolist(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitle(arg))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
