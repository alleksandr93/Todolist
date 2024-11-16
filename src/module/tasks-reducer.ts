
import {v1} from 'uuid';
import {addTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';
import {TasksStateType} from '../app/App';

// Actions types
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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE_TASK_STATUS':
            const {todolistId, taskId, isDone,} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(el => el.id === taskId ? {
                    ...el,
                    isDone
                } : el)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {type: 'REMOVE_TASK', payload} as const
}
export const addTaskAC = (payload: { todolistId: string, title: string }) => {
    return {type: 'ADD_TASK', payload} as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: 'CHANGE_TASK_STATUS', payload} as const
}
export const changeTaskTitleStatusAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: 'CHANGE_TASK_TITLE', payload} as const
}