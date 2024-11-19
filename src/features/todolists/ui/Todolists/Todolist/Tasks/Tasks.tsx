import React from 'react';
import List from '@mui/material/List';
import {TodolistType} from '../../../../../../app/App';

import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {Task} from './Task/Task';
import {selectTasks} from '../../../../../../app/appSelectors';


type PropsType = {
    todolist:TodolistType
}
export const Tasks = ({todolist}:PropsType) => {
    const tasks = useAppSelector(selectTasks)
    const allTasks=tasks[todolist.id]
    let tasksForTodolist = allTasks
    if (todolist.filter === 'active') {
        tasksForTodolist = allTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = allTasks.filter(task => task.isDone)
    }
    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map(t=><Task key={t.id} task={t} todolistId={todolist.id}/>)}
                    </List>
            }
        </>
    );
};

