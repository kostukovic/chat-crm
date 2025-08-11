import { defineStore } from 'pinia'

export type Priority = 'green' | 'yellow' | 'red'

type Keys =
  | 'startup' | 'addons' | 'perform' | 'account' | 'settings'
  | 'telegram' | 'email' | 'calendar'   // 👈 neu

export const useNotifications = defineStore('notifications', {
  state: () => ({
    // Zähler pro Symbol (Startup sammelt alles)
    counters: {
      startup: { count: 0, prio: 'green' as Priority },
      addons: { count: 0, prio: 'green' as Priority },
      perform: { count: 0, prio: 'green' as Priority },
      account: { count: 0, prio: 'green' as Priority },
      settings: { count: 0, prio: 'green' as Priority },
      telegram: { count: 0, prio: 'green' as Priority },  // 👈 neu
      email:    { count: 0, prio: 'green' as Priority },  // 👈 neu
      calendar: { count: 0, prio: 'green' as Priority },  // 👈 neu
    }
  }),
  actions: {
    set(key: keyof typeof this.counters, count: number, prio: Priority = 'green') {
      this.counters[key].count = count
      this.counters[key].prio = prio
    }
  }
})