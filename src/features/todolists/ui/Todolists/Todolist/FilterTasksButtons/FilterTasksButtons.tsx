import React from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { FilterValuesType } from "../../../../../../app/App"
import { changeTodolistFilterAC, type DomainTodolist } from "../../../../module/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { filterButtonsContainerSX } from "./FilterTasksButtons.styles"

type PropsType = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: PropsType) => {
  const { filter, id } = todolist
  const dispatch = useAppDispatch()
  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
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
