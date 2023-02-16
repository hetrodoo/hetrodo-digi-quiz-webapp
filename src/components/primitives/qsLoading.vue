<template>
  <div class="loader-container">
    <div class="el"></div>
    <div class="el"></div>
    <div class="el"></div>
    <div class="el"></div>
    <div class="el"></div>
    <div class="el"></div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
.loader-container
  display: inline-flex
  gap: 8px
  height: 32px
  justify-content: center
  align-items: center

  .el
    width: 8px
    height: 8px
    border-radius: 8px
    background-color: var(--secondary)
    animation: loadingAnim ease-in-out 600ms infinite

  .el:nth-child(1)
    animation-delay: 50ms

  .el:nth-child(2)
    animation-delay: 100ms

  .el:nth-child(3)
    animation-delay: 150ms

  .el:nth-child(4)
    animation-delay: 200ms

  .el:nth-child(5)
    animation-delay: 250ms

  .el:nth-child(6)
    animation-delay: 300ms

@keyframes loadingAnim
  0%
    height: 8px
  50%
    height: 24px
  100%
    height: 8px
</style>
