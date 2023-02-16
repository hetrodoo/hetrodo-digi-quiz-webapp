<template>
  <div class="center">
    Seu Resultado foi: {{ route.params.percentage }}%
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="sass">
.center
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  font-size: 24px
</style>
