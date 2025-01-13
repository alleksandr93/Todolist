import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { selectThemeMode } from "./appSelectors"
import type { DomainTask } from "../features/todolists/api"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { Main } from "./Main"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"

export type FilterValuesType = "all" | "active" | "completed"

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
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
