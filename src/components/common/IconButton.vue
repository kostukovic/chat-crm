<script setup lang="ts">
  import { computed } from 'vue'
  import Badge from './Badge.vue'
  import { useUiStore } from '../../stores/ui'
  import { useNotifications } from '../../stores/notifications'
  
  const props = defineProps<{
    id:
      | 'menu'|'startup'|'addons'|'perform'|'account'|'settings'
      | 'telegram'|'email'|'calendar'
      | 'whatsapp'|'signal'|'slack'|'drive'|'notes'|'voice'|'tasks'|'crm'|'support',
    emoji: string,
    label: string,
    fixed?: boolean
  }>()
  
  const ui = useUiStore()
  const noti = useNotifications()
  const compact = computed(() => !ui.navExpanded)
  const isActive = computed(() => ui.active === props.id)
  const badge = computed(() => ((noti.counters as any)?.[props.id]) ?? { count: 0, prio: 'green' })
  
  function onClick(){
    if (props.id === 'menu') {
      ui.toggleNav()
    } else {
      ui.setActive(props.id)
      if (ui.bp >= 1) ui.toggleList(true)
    }
  }
</script>
  
<template>
    <!-- aria-label keeps button accessible when text label is hidden in compact mode -->
    <button
      class="btn"
      :class="[{ active: isActive, compact }]"
      @click="onClick"
      :aria-label="label"
      type="button"
    >
    <span class="emoji">{{ emoji }}</span>
    <span v-if="!compact" class="label">{{ label }}</span>
    <Badge v-if="props.id !== 'menu'" class="relative" :count="badge.count" :prio="badge.prio" />
  </button>
</template>