import { AddItemForm } from "common/components"
import { TodolistType } from "../../../../../app/App"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC, addTaskTC } from "../../../module/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import { Tasks } from "./Tasks/Tasks"

type PropsType = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const addTask = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
