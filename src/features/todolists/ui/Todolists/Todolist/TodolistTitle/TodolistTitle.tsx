import React from "react"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { type DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../module/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import styles from "./TodolistTitle.module.css"

type PropsType = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const removeTodolist = () => {
    dispatch(removeTodolistTC(todolist.id))
  }
  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ title, id: todolist.id }))
  }
  console.log(todolist.entityStatus)
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} disabled={todolist.entityStatus === "loading"} />
        <IconButton
          disabled={todolist.entityStatus === "loading"}
          aria-label="delete"
          size="small"
          onClick={removeTodolist}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
    </div>
  )
}
