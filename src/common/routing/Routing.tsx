import React from "react"
import { Route, Routes } from "react-router"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"
import { Path } from "../../features/todolists/lib/enums"

export const Routing = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}
