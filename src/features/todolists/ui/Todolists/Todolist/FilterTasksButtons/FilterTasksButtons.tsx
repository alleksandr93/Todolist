import React from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks"
import { filterButtonsContainerSX } from "./FilterTasksButtons.styles"
import { todolistApi } from "../../../../api"
import { current } from "@reduxjs/toolkit"
import type { DomainTodolist, FilterValues } from "../../../../lib/types/types"

type PropsType = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: PropsType) => {
  const { filter, id } = todolist
  const dispatch = useAppDispatch()
  const changeFilterTasksHandler = (filter: FilterValues) => {
    // 1. Имя инпоитна(Получение тудулистов). 2. Аргементы которые есть в даном инпоинте(getTodolist). 3. Callback в котром будем делать обновления
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, state => {
        // current функция чтобы посмореть state
        let s = current(state)
        const todolist = state.find(todos => todos.id === id)
        if (todolist) todolist.filter = filter
      }),
    )
  }
  return (
    <ButtonGroup sx={filterButtonsContainerSX}>
      <Button
        variant={filter === "all" ? "outlined" : "contained"}
        color="error"
        onClick={() => changeFilterTasksHandler("all")}
      >
        all
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "contained"}
        color="primary"
        onClick={() => changeFilterTasksHandler("active")}
      >
        active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "contained"}
        color="secondary"
        onClick={() => changeFilterTasksHandler("completed")}
      >
        completed
      </Button>
    </ButtonGroup>
  )
}
