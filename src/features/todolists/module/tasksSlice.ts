import { type DomainTask, tasksApi, type UpdateTaskDomainModel, type UpdateTaskModel } from "../api"
import { ResultCode } from "../lib/enums"
import type { TasksStateType } from "../../../app/App"
import type { AppThunk } from "../../../app/store"
import { handleServerNetworkError } from "common/utils"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { setAppStatus } from "../../../app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      },
    ),
    clearTasks: create.reducer((state, action) => {
      return {}
    }),
  }),
  extraReducers: builder => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistId]
    })
  },
  selectors: {
    selectTasks: state => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, clearTasks, removeTask, updateTask, addTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
// Thunk

export const fetchTasksTC =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .getTasks(id)
      .then(res => {
        dispatch(setTasks({ todolistId: id, tasks: res.data.items }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const deleteTaskTC =
  (arg: { todolistId: string; taskId: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .deleteTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask(arg))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const addTaskTC =
  (arg: { todolistId: string; title: string }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .createTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch, getState) => {
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      }
      dispatch(setAppStatus({ status: "loading" }))
      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTask(arg))
            dispatch(setAppStatus({ status: "succeeded" }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch(error => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
