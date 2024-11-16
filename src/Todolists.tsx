import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleStatusAC, removeTaskAC} from './module/tasks-reducer';
import {removeTodolistAC, updateTodolistAC} from './module/todolist-reducer';
import {useAppDispatch, useAppSelector} from './app/hooks';

export const Todolists = () => {
    // const tasks = useAppSelector(state => state.tasks)
    // const todolists = useAppSelector(state => state.todolists)
    const {tasks,todolists}=useAppSelector(state=>state);
    const dispatch = useAppDispatch()
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleStatusAC({todolistId, taskId, title}))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone: taskStatus}))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }



    const updateTodolist = (todolistID: string, title: string) => {
        dispatch(updateTodolistAC({id: todolistID, title}))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    return <>
        <Grid container spacing={4}>
            {todolists.map((tl) => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={6} sx={{p: '30px', borderRadius: '5px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                updateTask={updateTask}
                                updateTodolist={updateTodolist}/>
                        </Paper>
                    </Grid>

                )
            })}
        </Grid>
    </>
};
