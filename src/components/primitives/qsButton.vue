<template>
<div class="qs-button" :style="style">
  <slot />
</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const style = defineProps<{
  backgroundColor: string
  color: string
}>()
</script>

<style scoped lang="sass">
.qs-button
  cursor: pointer
  display: inline-block
  padding: 10px
  font-weight: bold
  text-transform: capitalize
  border-radius: 8px
  transition: filter 125ms ease-in-out

  &:hover
    filter: brightness(85%)
</style>
