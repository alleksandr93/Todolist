import React, {ChangeEvent} from 'react';
import ListItem from '@mui/material/ListItem';
import {listItemSx} from './Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType, TodolistType} from './app/App';
import {useDispatch} from 'react-redux';

import {addTaskAC, changeTaskStatusAC, removeTaskAC} from './module/tasks-reducer';
import {useAppDispatch} from './app/hooks';

type PropsType = {
    task:TaskType
    todolist:TodolistType
}
export const Task = ({task,todolist}:PropsType) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId:task.id,todolistId:todolist.id}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId:task.id,todolistId:todolist.id,isDone:newStatusValue}))
    }
    const updateTaskHandler = (newTitle: string) => {
        console.log(newTitle)
        dispatch(addTaskAC({todolistId:todolist.id,title:newTitle}))
    }
    return  <ListItem sx={listItemSx(task.isDone)}
                      key={task.id}
                      className={task.isDone ? 'is-done' : ''}>
        <div>
            <Checkbox defaultChecked checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan oldTitle={task.title} updateItem={(newTitle) => updateTaskHandler(newTitle)}/>
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
    </ListItem>
};

