
import { EditableSpan } from "./EditableSpan";
import { TaskType } from './App';
import { ChangeEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



type Props = {
    task: TaskType
    removeTaskHandler: () => void
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    updateTaskHandler: (newTitle: string) => void

};
export const Task = ({ task, removeTaskHandler, changeTaskStatusHandler, updateTaskHandler }: Props) => {
 
};