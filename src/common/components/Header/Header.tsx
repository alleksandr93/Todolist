import { getTheme } from "../../theme/theme"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import { MenuButton } from "../MenuButton/MenuButton"
import Switch from "@mui/material/Switch"
import Box from "@mui/material/Box"
import * as React from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { LinearProgress } from "@mui/material"
import { changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "../../../features/todolists/lib/enums"
import { baseApi } from "../../../app/baseApi"

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)
  const [logout] = useLogoutMutation()
  const changeModeHandler = () => {
    dispatch(changeTheme({ theme: themeMode === "light" ? "dark" : "light" }))
    localStorage.setItem("sn-theme", themeMode === "light" ? "dark" : "light")
  }
  const logoutHandler = () => {
    console.log(21313)
    logout().then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        // Для зачистки кеша
        dispatch(baseApi.util.resetApiState())
        // удаляем токен в локал стордж
        localStorage.removeItem("sn-token")
      }
    })
  }
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <MenuButton onClick={logoutHandler} color="inherit">
              Logout
            </MenuButton>
          )}
          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch defaultChecked={themeMode === "dark"} onClick={changeModeHandler} />
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
