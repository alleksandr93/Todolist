import { createTheme } from "@mui/material"
import { ThemeMode } from "../../app/appSlice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#4acaf6",
      },
    },
  })
}
