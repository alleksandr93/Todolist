import { type UnknownAction } from "redux"
import { tasksReducer, tasksSlice } from "../features/todolists/module/tasksSlice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/module/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { todolistApi } from "../features/todolists/api"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

// непосредственно создаём store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistApi.middleware),
})

setupListeners(store.dispatch)
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// 2 типизация Thunk
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
