import React from "react"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodolistType } from "../../../../../../app/App"
import {
  removeTodolistAC,
  removeTodolistTC,
  changeTodolistTitleAC,
  updateTodolistTitleTC,
} from "../../../../module/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import styles from "./TodolistTitle.module.css"

type PropsType = {
  todolist: TodolistType
}
export const TodolistTitle = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const removeTodolist = () => {
    dispatch(removeTodolistTC(todolist.id))
  }
  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ title, id: todolist.id }))
  }
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} />
        <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
    </div>
  )
}
