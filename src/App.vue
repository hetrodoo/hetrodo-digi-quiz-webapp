<template>
  <qs-overlay v-if="store.getters.GET_IS_LOADING">
    <qs-loading />
    <span style="margin-top: 2em">Warming up the API, this might take a while...</span>
  </qs-overlay>

  <router-view />
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap')
*
  --primary: #f5f1e5
  --secondary: #e52729
  font-family: 'Roboto', sans-serif

body, html
  background-color: var(--primary)
  margin: 0
  padding: 0
  min-width: 100%
  min-height: 100%
</style>

<script setup lang="ts">
import QsOverlay from '@/components/primitives/qsOverlay.vue'
import QsLoading from '@/components/primitives/qsLoading.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>
