import Pagination from "@mui/material/Pagination"
import { ChangeEvent } from "react"
import s from "./TasksPagination.module.css"
import { PAGE_SIZE } from "../../api"
import Typography from "@mui/material/Typography"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        shape="circular"
        onChange={changePageHandler}
        color="primary"
        className={s.pagination}
      />
      <div className={s.totalCount}>
        <Typography variant="subtitle1">Tasks: {totalCount}</Typography>
      </div>
    </>
  )
}
