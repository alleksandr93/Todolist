import React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks"
import { addTodolistTC } from "../features/todolists/module/todolists-reducer"

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
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
