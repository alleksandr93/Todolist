import * as React from "react"

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectAppEror } from "../../../app/appSelectors"
import { useAppDispatch } from "common/hooks"
import { setAppError } from "../../../app/appSlice"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppEror)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
