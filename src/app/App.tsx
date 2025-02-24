import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import type { DomainTask } from "../features/todolists/api"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "common/routing/Routing"
import { useEffect, useState } from "react"
import { useAppDispatch } from "common/hooks"
import s from "./App.module.css"
import { selectThemeMode, setIsLoggedIn, setTheme, type ThemeMode } from "./appSlice"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "../features/todolists/lib/enums"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        let theme = localStorage.getItem("sn-theme") as ThemeMode
        dispatch(setTheme({ theme }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
