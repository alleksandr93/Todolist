import type { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types"
// "@reduxjs/toolkit/query" изначально будет потому что это используеться для других фреймворков типа Angular , надо добавить react в конце: "@reduxjs/toolkit/query/react"
import {
  type BaseQueryArg,
  type BaseQueryMeta,
  type BaseQueryResult,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import type { DomainTodolist } from "../module/todolistsSlice"

export const todolistApi = createApi({
  reducerPath: "todolistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    // Нужен чтобы постоянно цеплять токен на каждый запрос из локал стор
    prepareHeaders: headers => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  endpoints: builder => ({
    // todo Todolist[]
    // Типизаци 1. Типизация возвращаемого аргумента Todolist[] , 2. Типизация аргумента , если его нет то void
    getTodolists: builder.query<DomainTodolist[], void>({
      //method: "GET",
      //url: "todo-lists",
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title: string) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
    }),
    updateTodolist: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } =
  todolistApi
export const _todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist: (id: string) => {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  updateTodolist: (arg: { id: string; title: string }) => {
    const { id, title } = arg
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
}
