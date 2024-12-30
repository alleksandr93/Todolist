import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer"
import { TasksStateType } from "../../../app/App"
import type { AppThunk } from "../../../app"
import { type DomainTask, tasksApi, type UpdateTaskModel } from "../api"
import { TaskStatus } from "../lib/enums"

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleStatusAC>

const initialState: TasksStateType = {}
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET_TASK":
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId),
      }
    }
    case "ADD_TASK":
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [action.payload.task, ...state[newTask.todoListId]],
      }
    case "CHANGE_TASK_STATUS":
      const { todolistId, taskId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map(el =>
          el.id === taskId
            ? {
                ...el,
                status,
              }
            : el,
        ),
      }
    case "CHANGE_TASK_TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(el =>
          el.id === action.payload.taskId
            ? {
                ...el,
                title: action.payload.title,
              }
            : el,
        ),
      }
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }
    case "REMOVE-TODOLIST":
      const copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState

    default:
      return state
  }
}
// Thunk
export const fetchTasksTC =
  (id: string): AppThunk =>
  dispatch => {
    tasksApi.getTasks(id).then(res => {
      dispatch(setTasksAC({ todolistId: id, tasks: res.data.items }))
    })
  }
export const deleteTaskTC =
  (arg: { todolistId: string; taskId: string }): AppThunk =>
  dispatch => {
    tasksApi.deleteTask(arg).then(res => {
      dispatch(removeTaskAC(arg))
    })
  }
export const addTaskTC =
  (arg: { todolistId: string; title: string }): AppThunk =>
  dispatch => {
    tasksApi.createTask(arg).then(res => {
      dispatch(addTaskAC({ task: res.data.data.item }))
    })
  }
export const updateTaskTC =
  (arg: { todolistId: string; taskId: string; status: TaskStatus }): AppThunk =>
  (dispatch, getState) => {
    const { todolistId, taskId, status } = arg
    const allTasks = getState().tasks
    const taskForTodolist = allTasks[todolistId]
    const task = taskForTodolist.find(f => f.id === taskId)
    if (task) {
      const model: UpdateTaskModel = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status,
      }
      tasksApi.updateTask({ todolistId, taskId, model }).then(res => {
        dispatch(changeTaskStatusAC(arg))
      })
    }
  }
// Action creators
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) => {
  return { type: "CHANGE_TASK_STATUS", payload } as const
}
export const changeTaskTitleStatusAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "CHANGE_TASK_TITLE", payload } as const
}
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET_TASK", payload } as const
}
