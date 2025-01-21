import React, { useEffect } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Todolist } from "./Todolist/Todolist"
import { selectTodolists } from "../../../../app/appSelectors"
import { fetchTodolistsTC } from "../../module/todolists-reducer"
import { useAppDispatch } from "common/hooks"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map(tl => {
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
