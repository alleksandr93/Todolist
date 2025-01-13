import { ChangeEvent, KeyboardEvent, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

type Props = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm = ({ addItem, disabled }: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addItemHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim())
      setTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  const buttonStyles = {
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        helperText={error}
        size="small"
        label={error ? error : "Enter a title"}
        variant="outlined"
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        disabled={disabled}
      />

      <Button variant="contained" onClick={addItemHandler} size={"small"} style={buttonStyles} disabled={disabled}>
        +
      </Button>
    </div>
  )
}
