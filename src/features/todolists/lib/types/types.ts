import type { Todolist } from "../../api"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}
export type FilterValues = "all" | "active" | "completed"
