<template>
  <div class="qs-overlay">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
.qs-overlay
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.25)
  backdrop-filter: blur(10px)
  z-index: 9999

</style>
