import type { Todolist } from "../../api"
import type { RequestStatus } from "../../../../app/appSlice"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}
export type FilterValues = "all" | "active" | "completed"
