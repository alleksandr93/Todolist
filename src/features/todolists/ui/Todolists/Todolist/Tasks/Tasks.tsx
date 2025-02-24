import React from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../lib/enums"
import { useGetTasksQuery } from "../../../../api"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import type { DomainTodolist } from "../../../../lib/types/types"

type PropsType = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: PropsType) => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery(todolist.id)
  console.log({ isError, error })

  const allTasks = tasks?.items

  let tasksForTodolist = allTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTasks?.filter(task => task.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = allTasks?.filter(task => task.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
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
