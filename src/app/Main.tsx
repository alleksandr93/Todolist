import React, { useEffect } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks"
import { addTodolistTC } from "../features/todolists/module/todolists-reducer"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "../features/auth/model/authSelector"
import { Path } from "../features/todolists/lib/enums"
import { useNavigate } from "react-router"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])
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
