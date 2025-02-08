import React from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api"

export const Todolists = () => {
  const { data: todolist } = useGetTodolistsQuery()

  return (
    <>
      {todolist?.map(tl => {
        return (
          <Grid item key={tl.id}>
            <Paper elevation={6} sx={{ p: "30px", borderRadius: "5px" }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
