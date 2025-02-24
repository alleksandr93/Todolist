import React from "react"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { todolistApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api"
import { useAppDispatch } from "common/hooks"
import type { RequestStatus } from "../../../../../../app/appSlice"
import type { DomainTodolist } from "../../../../lib/types/types"

type PropsType = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, state => {
        const todo = state.find(tl => tl.id === todolist.id)
        if (todo) {
          todo.entityStatus = status
        }
      }),
    )
  }

  const removeTodolist = () => {
    updateQueryData("loading")
    deleteTodolist("todolist.id")
      .unwrap()
      .then(res => {
        updateQueryData("idle")
      })
      .catch(err => {
        updateQueryData("failed")
      })
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
