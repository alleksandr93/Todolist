import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm, EditableSpan } from "common/components"
import type { Todolist } from "../features/todolists/api/todolistsApi.types"
import { type DomainTask, type UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types"
import { TaskStatus } from "../features/todolists/lib/enums"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

  useEffect(() => {
    todolistsApi
      .getTodolists()
      .then(res => {
        const todolist = res.data
        setTodolists(todolist)
        todolist.forEach(tl => {
          tasksApi.getTasks(tl.id).then(res => {
            console.log(res.data)
            setTasks(prevTasks => ({
              ...prevTasks,
              [tl.id]: res.data.items,
            }))
          })
        })
      })
      .catch(() => {
        console.log("Error")
      })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi
      .createTodolist(title)
      .then(res => {
        const newTodolist = res.data.data.item
        setTodolists([newTodolist, ...todolists])
      })
      .catch(() => console.log("Error"))
  }
  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then(res => {
      setTodolists(prevState => prevState.filter(el => el.id !== id))
    })
  }
  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then(res => {
      setTodolists(prevState => prevState.map(el => (el.id === id ? { ...el, title } : el)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ todolistId, title }).then(res => {
      setTasks(prevState => ({
        ...prevState,
        [todolistId]: [res.data.data.item, ...prevState[todolistId]],
      }))
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ taskId, todolistId }).then(res => {
      console.log(res.data)
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter(el => el.id !== taskId),
      })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status,
    }
    tasksApi.updateTask({ todolistId, taskId: task.id, model }).then(res => {
      console.log(res.data.data.item)
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map(el => (el.id === task.id ? newTask : el)),
      })
    })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask, todolistId: string) => {
    const model: UpdateTaskModel = {
      title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }
    instance
      .put<
        BaseResponse<{
          item: DomainTask
        }>
      >(`todo-lists/${todolistId}/tasks/${task.id}`, model)
      .then(res => {
        console.log(res.data)
        const newTask = res.data.data.item
        setTasks({
          ...tasks,
          [task.todoListId]: tasks[task.todoListId].map(el => (el.id === task.id ? newTask : el)),
        })
      })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />
      {/* Todolists */}
      {todolists.map(tl => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map(task => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan value={task.title} onChange={title => changeTaskTitleHandler(title, task, tl.id)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
