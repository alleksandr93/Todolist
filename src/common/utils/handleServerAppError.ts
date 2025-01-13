import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import type { AppDispatch } from "../../app/store"
import type { BaseResponse } from "common/types"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"))
  dispatch(setAppStatusAC("failed"))
}
