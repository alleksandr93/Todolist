import { type TaskPriority, TaskStatus } from "../lib/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
export type UpdateTaskModel = {
  title?: string
  description: string | null
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  status?: TaskStatus
}
// UpdateTaskDomainModel это такой же тип как и UpdateTaskModel,
// только все свойства в нем являются необязательными
export type UpdateTaskDomainModel = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string | null
  deadline?: string
}
export type DomainTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string | null
}
