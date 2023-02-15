<template>
  <qs-container absolute>
    <qs-button
      background-color="var(--secondary)"
      color="#FFF"
    >
      Avançar
    </qs-button>

    <qs-progress :progress="25" />

    <router-view/>
  </qs-container>
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
import QsButton from '@/components/primitives/qsButton.vue'
import QsContainer from '@/components/primitives/qsContainer.vue'
import QsProgress from '@/components/primitives/qsProgress.vue'
</script>
