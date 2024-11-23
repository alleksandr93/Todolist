import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios';

const token = 'a0c9a9d4-dd07-4175-a213-f88745b43d71'
const apiKey = '4c61ed4e-d0e7-481a-b073-5bb18a604f68'


type FieldError = {
    error: string
    field: string
}
type Respons<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: T
}
type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
type UpdateTaskModel ={
    title:string,
    description: string|null
    priority: number
    startDate: string|null
    deadline: string|null
    status: TaskStatus
}
export type DomainTask = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string | null
}

enum TaskStatus {
    notReady = 0,
    part = 1,
    done = 2,
}

export const AppHttpRequests = () => {
    const options = {
        withCredentials: true,
        headers: {
            'API-KEY': apiKey,
            'Authorization': `Bearer ${token}`,
        }
    }
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', options)
            .then((res) => {
                const todolist = res.data
                setTodolists(todolist)
                todolist.forEach(tl => {
                    axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, options)
                        .then((res) => {
                            console.log(res.data)
                            setTasks(prevTasks => ({...prevTasks, [tl.id]: res.data.items}))
                        })
                })

            }).catch(() => {
            console.log('Error')
        })

    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Respons<{
            item: Todolist
        }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, options)
            .then((res) => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            }).catch(() => console.log('Error'))
    }
    const removeTodolistHandler = (id: string) => {
        axios.delete<Respons>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, options)
            .then((res) => {
                setTodolists(prevState => prevState.filter(el => el.id !== id))
            })
    }
    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<Respons>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, options)
            .then((res) => {
                setTodolists(prevState => prevState.map(el => el.id === id ? {...el, title} : el))
            })
    }


    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Respons<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, options)
            .then((res) => {
                setTasks({...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Respons>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, options)
            .then((res) => {
                console.log(res.data)
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
        let newStatus = e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady
        const model:UpdateTaskModel = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: newStatus
        }

        axios.put<Respons<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, model, options)
            .then((res) => {
                console.log(res.data.data.item)
                const newTask = res.data.data.item
                setTasks({
                    ...tasks,
                    [task.todoListId]: tasks[task.todoListId].map(el => el.id === task.id ? newTask : el)
                })
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask, todolistId: string) => {
        const model:UpdateTaskModel = {
            title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status
        }
        axios.put<Respons<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, model, options)
            .then((res) => {
                console.log(res.data)
                const newTask = res.data.data.item
                setTasks({
                    ...tasks,
                    [task.todoListId]: tasks[task.todoListId].map(el => el.id === task.id ? newTask : el)
                })
            })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === TaskStatus.done}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task, tl.id)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}