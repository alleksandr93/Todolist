import React, {ChangeEvent} from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../../../../../../../app/App';
import {changeTaskStatusAC, changeTaskTitleStatusAC, removeTaskAC} from '../../../../../module/tasks-reducer';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';
import {getListItemSx} from './Task.styles';


type PropsType = {
    task:TaskType
    todolistId:string
}
export const Task = ({task,todolistId}:PropsType) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId:task.id,todolistId}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId:task.id,todolistId,isDone:newStatusValue}))
    }
    const updateTaskHandler = (newTitle: string) => {
        dispatch(changeTaskTitleStatusAC({todolistId:todolistId,taskId:task.id,title:newTitle,}))
    }
    return  <ListItem sx={getListItemSx(task.isDone)}
                      key={task.id}
                      className={task.isDone ? 'is-done' : ''}>
        <div>
            <Checkbox defaultChecked checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={task.title} onChange={(newTitle) => updateTaskHandler(newTitle)}/>
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
    </ListItem>
};

