import React from "react"
import List from "@mui/material/List"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { Task } from "./Task/Task"
import { selectTasks } from "../../../../../../app/appSelectors"
import { TaskStatus } from "../../../../lib/enums"
import type { DomainTodolist } from "../../../../module/todolistsSlice"

type PropsType = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: PropsType) => {
  const tasks = useAppSelector(selectTasks)
  const allTasks = tasks[todolist.id]
  let tasksForTodolist = allTasks
  if (todolist.filter === "active") {
    tasksForTodolist = allTasks.filter(task => task.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = allTasks.filter(task => task.status === TaskStatus.Completed)
  }
  return (
    <>
      {tasksForTodolist && tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist &&
            tasksForTodolist.map(t => (
              <Task key={t.id} task={t} todolistId={todolist.id} disabled={todolist.entityStatus === "loading"} />
            ))}
        </List>
      )}
    </>
  )
}
