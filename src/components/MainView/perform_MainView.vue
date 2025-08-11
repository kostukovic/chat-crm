<!-- src/components/NavView.vue -->

<template>
  <nav>
    <button @click="ui.toggleMenu">🍔</button>
    <button @click="ui.toggleList">☰ Liste</button>
  </nav>
</template>

<script setup>
  import { useUiStore } from '../stores/ui.js'
  const ui = useUiStore()
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 100%;
}

</style>