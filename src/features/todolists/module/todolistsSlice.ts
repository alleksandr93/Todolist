import { FilterValuesType } from "../../../app/App"
import { type Todolist } from "../api"
import { type RequestStatus } from "../../../app/appSlice"
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
