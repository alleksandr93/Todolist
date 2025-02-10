import type { Todolist } from "./todolistsApi.types"
import type { BaseResponse } from "common/types"
// "@reduxjs/toolkit/query" изначально будет потому что это используеться для других фреймворков типа Angular , надо добавить react в конце: "@reduxjs/toolkit/query/react"
import type { DomainTodolist } from "../module/todolistsSlice"
import { baseApi } from "../../../app/baseApi"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Типизаци 1. Типизация возвращаемого аргумента Todolist[] , 2. Типизация аргумента , если его нет то void
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      // используеться при получении
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title: string) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      // используеться при изменении
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } =
  todolistApi
