import { create } from 'zustand'

export type GoalsState = {
  reloadSignal: number
  triggerReload: () => void
}

export const useGoalsStore = create<GoalsState>(
  (set: (partial: Partial<GoalsState> | ((state: GoalsState) => Partial<GoalsState>)) => void) => ({
    reloadSignal: 0,
    triggerReload: () => set((s: GoalsState) => ({ reloadSignal: s.reloadSignal + 1 })),
  })
)

export default useGoalsStore
