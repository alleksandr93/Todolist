import { ChangeEvent, useState } from "react"

type Props = {
  value: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}
export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(value)

  const activateEditModeHandler = () => {
    if (!disabled) {
      setEditMode(!editMode)
      if (editMode) {
        addItemHandler()
      }
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  const addItemHandler = () => {
    onChange(newTitle)
  }

  return editMode ? (
    <input
      disabled={disabled}
      onChange={changeTitleHandler}
      type="text"
      value={newTitle}
      onBlur={activateEditModeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditModeHandler}>{value}</span>
  )
}
