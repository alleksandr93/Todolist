import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types"
import type { Inputs } from "../ui/Login/Login"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, Inputs>({
      query: arg => ({
        method: "POST",
        url: "auth/login",
        body: arg,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
  }),
})
export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
export const _authApi = {
  login: (arg: Inputs) => {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", arg)
  },
  logout: () => {
    return instance.delete<BaseResponse>("auth/login")
  },
  me: () => {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
