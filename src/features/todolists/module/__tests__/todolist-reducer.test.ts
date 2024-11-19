import {v1} from 'uuid';

import {
    addTodolistAC, changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistAC
} from '../todolist-reducer';
import {TodolistType} from '../../../../app/App';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    const endState = todolistReducer(startState, addTodolistAC('New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
})
test('correct todolist should change its name', () => {

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id:todolistId2,
            title: 'New Todolist'
        }
    } as const
    const endState = todolistReducer(startState, updateTodolistAC({id:todolistId2, title:'New Todolist'}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})
test('correct filter of todolist should be changed', () => {

    const endState = todolistReducer(startState, changeFilterAC({id:todolistId2,filter :'completed'}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})