import { defineStore } from 'pinia'

export type ModuleKey = 'telegram' | 'email' | 'calendar'
export type ItemKey = 'nataschaa' | 'kostja' | 'andrei' | 'nina' | 'goscha' | 'wichtig'

export const useSelectionStore = defineStore('selection', {
  state: () => ({
    module: null as ModuleKey | null,
    item: null as ItemKey | null,
  }),
  actions: {
    select(mod: ModuleKey, item: ItemKey){
      this.module = mod
      this.item = item
    },
    clear(){ this.module = null; this.item = null }
  }
})