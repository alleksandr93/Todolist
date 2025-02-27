import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components"
import { type DomainTask, type UpdateTaskModel, useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../../api"
import { TaskStatus } from "../../../../../lib/enums"
import { createTaskModel } from "../../../../../lib/utils/createTaskModel"

type PropsType = {
  task: DomainTask
  todolistId: string
  disabled: boolean
}
export const Task = ({ task, todolistId, disabled }: PropsType) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ todolistId: todolistId, taskId: task.id })
  }
  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ todolistId, taskId: task.id, model })
  }
  const updateTaskHandler = (newTitle: string) => {
    const model = createTaskModel(task, { title: newTitle })
    updateTask({ todolistId, taskId: task.id, model })
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
