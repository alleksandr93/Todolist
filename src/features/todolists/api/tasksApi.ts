import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { BaseResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"
import { current } from "@reduxjs/toolkit"

export const PAGE_SIZE = 4

export const taskApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTasks: builder.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        // Через params
        params: { ...args, count: PAGE_SIZE },
      }),
      providesTags: (result, error, { todolistId }) => (result ? [{ type: "Task", id: todolistId }] : ["Task"]),
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        method: "POST",
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (result, error, { title, todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (result, error, { taskId, todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = taskApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []

        cachedArgsForQuery.forEach(({ args }) => {
          patchResults.push(
            dispatch(
              taskApi.util.updateQueryData("getTasks", { todolistId, args: { page: args.page } }, state => {
                const task = state.items.find(t => t.id === taskId)
                if (task) {
                  task.status = model.status
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach(patchResult => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (result, error, { taskId, todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi
