import {addTaskAC, changeTaskStatusAC, changeTaskTitleStatusAC, removeTaskAC, tasksReducer} from '../tasks-reducer'

import {addTodolistAC, removeTodolistAC} from '../todolist-reducer';
import {v1} from 'uuid';
import {TasksStateType} from '../../../../app/App';

let startState: TasksStateType= {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistId: 'todolistId2', taskId: '2'}))

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})
test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC({title: 'juce', todolistId: 'todolistId2'}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBeFalsy()
})
test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({
        todolistId: 'todolistId2',
        taskId: '2',
        isDone: false
    }))

    expect(endState['todolistId2']['2'].isDone).toBe(false)
    expect(endState['todolistId2']['2'].isDone).not.toBeTruthy()
})
test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleStatusAC({
        todolistId: 'todolistId2',
        title: 'new Title',
        taskId: '2'
    }))
    expect(endState['todolistId2'][1].title).toBe('new Title')
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})