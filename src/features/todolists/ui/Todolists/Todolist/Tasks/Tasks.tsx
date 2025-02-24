import React from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../lib/enums"
import type { DomainTodolist } from "../../../../module/todolistsSlice"
import { useAppDispatch } from "common/hooks"
import { useGetTasksQuery } from "../../../../api"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { setAppError } from "../../../../../../app/appSlice"

type PropsType = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: PropsType) => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery(todolist.id)
  console.log({ isError, error })
  const dispatch = useAppDispatch()
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
  // if (error) {
  //   if ("status" in error) {
  //     //fetchBaseQueryError
  //     const errorMsg = "error" in error ? error.error : JSON.stringify(error.data)
  //     dispatch(setAppError({ error: errorMsg }))
  //   } else {
  //     //SerializedError
  //     dispatch(setAppError({ error: error.message ? error.message : "Some error" }))
  //   }
  // }
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
