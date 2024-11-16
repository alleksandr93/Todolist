import {AddItemForm} from './AddItemForm';

import {TaskType, TodolistType} from './app/App';
import {FilterTasksButtons} from './FilterTasksButtons';

import {Tasks} from './Tasks';
import {TodolistTitle} from './TodolistTitle';
import {useDispatch} from 'react-redux';
import {addTodolistAC} from './module/todolist-reducer';
import {useAppDispatch} from './app/hooks';


type PropsType = {
    todolist: TodolistType
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        todolist,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        removeTodolist,
        updateTodolist
    } = props
    const dispatch = useAppDispatch()
    const addTaskHandler = (title: string) => {
        dispatch(addTodolistAC(title))

    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <TodolistTitle todolist={todolist}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
