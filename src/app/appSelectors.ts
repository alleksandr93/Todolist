import type { RootState } from "./store"

export const selectThemeMode = (state: RootState) => state.app?.themeMode

export const selectTodolists = (state: RootState) => state.todolists

export const selectTasks = (state: RootState) => state.tasks
