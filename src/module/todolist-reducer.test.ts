import {v1} from 'uuid';
import {TodolistType} from '../App';
import {
    addTodolistAC, changeFilterAC,
    removeTodolistAC,
    RemoveTodolistActionType,
    todolistReduser,
    updateTodolistAC
} from './todolist-reducer';


test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReduser(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReduser(startState, addTodolistAC('New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
})
test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id:todolistID2,
            title: 'New Todolist'
        }
    } as const
    const endState = todolistReduser(startState, updateTodolistAC(todolistID2,'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})
test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistReduser(startState, changeFilterAC(todolistID2,'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})