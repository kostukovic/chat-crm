import { defineStore } from 'pinia'

export type PerfMode = 'standard' | 'active' | 'sleep' | 'auto'

export const useAddonsStore = defineStore('addons', {
  state: () => ({
    perfMode: (localStorage.getItem('perfMode') as PerfMode) ?? 'standard' as PerfMode,
  }),
  actions: {
    setPerfMode(m: PerfMode){
      this.perfMode = m
      localStorage.setItem('perfMode', m)
    }
  }
})
