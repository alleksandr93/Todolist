import { applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/module/tasks-reducer"
import { todolistsReducer } from "../features/todolists/module/todolists-reducer"
import { appReducer } from "./app-reducer"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// 2 типизация Thunk
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
