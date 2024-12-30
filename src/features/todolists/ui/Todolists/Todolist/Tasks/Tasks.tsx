import React, { useEffect } from "react"
import List from "@mui/material/List"
import { TodolistType } from "../../../../../../app/App"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { Task } from "./Task/Task"
import { selectTasks } from "../../../../../../app/appSelectors"
import { useAppDispatch } from "common/hooks"
import { fetchTasksTC } from "../../../../module/tasks-reducer"
import { TaskStatus } from "../../../../lib/enums"

type PropsType = {
  todolist: TodolistType
}
export const Tasks = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])
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
          {tasksForTodolist && tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id} />)}
        </List>
      )}
    </>
  )
}
