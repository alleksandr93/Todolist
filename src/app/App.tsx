import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { selectThemeMode } from "./appSelectors"
import type { DomainTask } from "../features/todolists/api"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "common/routing/Routing"
import { useLayoutEffect } from "react"
import { initializeAppTC } from "../features/auth/model/auth-reducer"
import { useAppDispatch } from "common/hooks"
import { selectIsInitialized } from "../features/auth/model/authSelector"
import s from "./App.module.css"
export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)
  useLayoutEffect(() => {
    dispatch(initializeAppTC())
  }, [])
  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
