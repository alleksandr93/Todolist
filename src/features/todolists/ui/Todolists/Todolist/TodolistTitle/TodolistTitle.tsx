import React from 'react';
import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistType} from '../../../../../../app/App';
import {removeTodolistAC, updateTodolistAC} from '../../../../module/todolist-reducer';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';
import styles from './TodolistTitle.module.css'

type PropsType ={
    todolist:TodolistType
}
export const TodolistTitle = ({todolist}:PropsType) => {
    const dispatch = useAppDispatch()
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    const updateTodolist = (title: string) => {
        dispatch(updateTodolistAC({id:todolist.id,title}))
    }
    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan oldTitle={todolist.title} updateItem={updateTodolist}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </div>
    );
};
