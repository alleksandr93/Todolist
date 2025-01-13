import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../module/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import { Tasks } from "./Tasks/Tasks"
import type { DomainTodolist } from "../../../module/todolists-reducer"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const addTask = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
