import React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistAC } from "../features/todolists/module/todolist-reducer"
import { useAppDispatch } from "common/hooks"

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }
  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
