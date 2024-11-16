import React from 'react';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistType} from './app/App';
import {removeTodolistAC, updateTodolistAC} from './module/todolist-reducer';
import {useAppDispatch} from './app/hooks';

type PropsType ={
    todolist:TodolistType
}
export const TodolistTitle = ({todolist}:PropsType) => {
    const dispatch = useAppDispatch()
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const updateTodolistHandler = (title: string) => {

        dispatch(updateTodolistAC({id:todolist.id,title}))
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={todolist.title} updateItem={updateTodolistHandler}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </div>
    );
};
