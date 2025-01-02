import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type { AppThunk, RootState, TasksStateType } from "../../../app"
import { type DomainTask, tasksApi, type UpdateTaskDomainModel, type UpdateTaskModel } from "../api"
import { TaskStatus } from "../lib/enums"
import type { Dispatch } from "redux"

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateActionType = ReturnType<typeof updateTaskAC>

const initialState: TasksStateType = {}
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateActionType
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

    case "UPDATE_TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.domainModel,
              }
            : t,
        ),
      }
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] }
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
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
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

      tasksApi.updateTask({ taskId, todolistId, model }).then(res => {
        dispatch(updateTaskAC(arg))
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
export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET_TASK", payload } as const
}
