import type { Todolist } from "./todolistsApi.types"
import type { BaseResponse } from "common/types"
// "@reduxjs/toolkit/query" изначально будет потому что это используеться для других фреймворков типа Angular , надо добавить react в конце: "@reduxjs/toolkit/query/react"
import { baseApi } from "../../../app/baseApi"
import type { DomainTodolist } from "../lib/types/types"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Типизаци 1. Типизация возвращаемого аргумента Todolist[] , 2. Типизация аргумента , если его нет то void
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map(tl => ({ ...tl, filter: "all" }))
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
      async onQueryStarted(todolistId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistApi.util.updateQueryData("getTodolists", undefined, state => {
            const index = state.findIndex(todo => todo.id === todolistId)
            if (index !== -1) state.splice(index, 1)
          }),
        )
        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
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
