<script setup lang="ts">
import { useAddonsStore } from "../../stores/addons";
const addons = useAddonsStore();
</script>

<template>
  <div>
    <h3 class="section-title">🚦 Performance</h3>
    <div style="padding: 0.5rem; display: grid; gap: 0.5rem">
      <label
        ><input
          type="radio"
          name="pm"
          value="standard"
          :checked="addons.perfMode === 'standard'"
          @change="addons.setPerfMode('standard')"
        />
        Standard</label
      >
      <label
        ><input
          type="radio"
          name="pm"
          value="active"
          :checked="addons.perfMode === 'active'"
          @change="addons.setPerfMode('active')"
        />
        Aktiv (volle Addon-Ladung)</label
      >
      <label
        ><input
          type="radio"
          name="pm"
          value="sleep"
          :checked="addons.perfMode === 'sleep'"
          @change="addons.setPerfMode('sleep')"
        />
        Deaktiv (Schlafmodus)</label
      >
      <label
        ><input
          type="radio"
          name="pm"
          value="auto"
          :checked="addons.perfMode === 'auto'"
          @change="addons.setPerfMode('auto')"
        />
        Automatik</label
      >
    </div>
  </div>
</template>
