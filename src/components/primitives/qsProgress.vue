<template>
  <div class="qs-progress">
    <div class="fill" :style="`width: ${Math.max(0, Math.min(100, props.progress))}%`" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  progress: number
}>()
</script>

<style scoped lang="sass">
.qs-progress
  display: flex
  align-items: center
  justify-content: flex-start

  height: 8px
  border-radius: 8px
  background-color: #d0d0d0

  .fill
    height: 8px
    border-radius: 8px
    background-color: var(--secondary)
    transition: width 250ms ease-in-out
</style>
