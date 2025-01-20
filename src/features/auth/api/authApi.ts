import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types"
import type { Inputs } from "../ui/Login/Login"

export const authApi = {
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
