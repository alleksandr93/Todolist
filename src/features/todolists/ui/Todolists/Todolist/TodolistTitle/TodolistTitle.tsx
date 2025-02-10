import React from "react"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { type DomainTodolist } from "../../../../module/todolistsSlice"
import styles from "./TodolistTitle.module.css"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api"

type PropsType = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: PropsType) => {
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()
  const removeTodolist = () => {
    deleteTodolist(todolist.id)
  }
  const updateTodolistHandler = (title: string) => {
    updateTodolist({ id: todolist.id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan
          value={todolist.title}
          onChange={updateTodolistHandler}
          disabled={todolist.entityStatus === "loading"}
        />
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
