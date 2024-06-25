
import {EditableSpan} from "./EditableSpan";

import {TaskType} from './App';
import {ChangeEvent} from 'react';
import {Button} from './Button';

type Props = {
    task:TaskType
    removeTaskHandler:()=>void
    changeTaskStatusHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    updateTaskHandler:(newTitle:string)=>void

};
export const Task = ({task,removeTaskHandler,changeTaskStatusHandler,updateTaskHandler}: Props) => {
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
            {/*<span>{task.title}</span>*/}
            <EditableSpan oldTitle={task.title} updateItem={(newTitle)=>updateTaskHandler(newTitle)}/>
            <Button onClick={removeTaskHandler} title={'x'}/>
        </li>
    );
};