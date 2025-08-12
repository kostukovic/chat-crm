<script setup lang="ts">
import { computed } from "vue";
import type { Priority } from "../../stores/notifications";
const props = defineProps<{ count: number; prio: Priority }>();
const display = computed(() => (props.count < 10 ? String(props.count) : "x"));
</script>

<template>
  <span class="badge" :class="prio" v-if="count > 0">{{ display }}</span>
</template>