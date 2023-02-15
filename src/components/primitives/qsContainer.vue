<template>
  <div :class="`qs-container ${props.absolute ? 'abs' : ''}`">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  absolute: boolean
}>()

</script>

<style scoped lang="sass">
.qs-container
  @media (orientation: landscape)
    width: 60%

  @media (orientation: portrait)
    width: 95%

  &.abs
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
