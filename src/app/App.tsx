import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { selectThemeMode } from "./appSelectors"
import type { DomainTask } from "../features/todolists/api"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { Main } from "./Main"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: DomainTask[]
}

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
