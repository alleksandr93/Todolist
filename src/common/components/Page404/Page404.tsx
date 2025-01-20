import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.btn}>
        <Link to="/">
          <span>Возврат на главную страницу</span>
        </Link>
      </div>
    </>
  )
}
