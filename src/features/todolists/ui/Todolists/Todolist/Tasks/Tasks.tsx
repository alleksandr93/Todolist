import React, { useState } from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../lib/enums"
import { PAGE_SIZE, useGetTasksQuery } from "../../../../api"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import type { DomainTodolist } from "../../../../lib/types/types"
import { TasksPagination } from "../../../TasksPagination/TasksPagination"

type PropsType = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: PropsType) => {
  const [page, setPage] = useState(1)
  const { data: tasks, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

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
        <>
          <List>
            {tasksForTodolist && tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id} />)}
          </List>
          {PAGE_SIZE < (tasks?.totalCount || 0) && (
            <TasksPagination totalCount={tasks?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  )
}
