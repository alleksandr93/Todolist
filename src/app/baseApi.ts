import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils/handleError"

export const baseApi = createApi({
  reducerPath: "todolistApi",
  baseQuery: async (args, api, extraOptions) => {
    // await new Promise(resolve => setTimeout(resolve, 2000)) // эмуляуия задержки

    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: headers => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)
    return result
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
  // 5 минут живут данные кеша потом удаляються (300 сек)
  keepUnusedDataFor: 300,
  // обновляет данные когда после прерывания соединения с интренетом он подгрузит данные
  refetchOnReconnect: true,
})
