import { useSelector } from "react-redux"
import type { RootState } from "../../app"

export const useAppSelector = useSelector.withTypes<RootState>()
