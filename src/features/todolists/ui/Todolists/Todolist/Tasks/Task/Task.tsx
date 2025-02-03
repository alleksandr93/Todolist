import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteTaskTC, updateTaskTC } from "../../../../../module/tasksSlice"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import type { DomainTask } from "../../../../../api"
import { TaskStatus } from "../../../../../lib/enums"

type PropsType = {
  task: DomainTask
  todolistId: string
  disabled: boolean
}
export const Task = ({ task, todolistId, disabled }: PropsType) => {
  const dispatch = useAppDispatch()
  const removeTaskHandler = () => {
    dispatch(deleteTaskTC({ todolistId: todolistId, taskId: task.id }))
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { status } }))
  }
  const updateTaskHandler = (newTitle: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title: newTitle } }))
  }
  return (
    <ListItem
      sx={getListItemSx(task.status === TaskStatus.Completed)}
      key={task.id}
      className={task.status === TaskStatus.Completed ? "is-done" : ""}
    >
      <div>
        <Checkbox
          disabled={disabled}
          defaultChecked
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan value={task.title} onChange={newTitle => updateTaskHandler(newTitle)} disabled={disabled} />
      </div>
      <IconButton disabled={disabled} aria-label="delete" size="small" onClick={removeTaskHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
