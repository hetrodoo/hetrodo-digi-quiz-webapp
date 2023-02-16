<template>
  <form
    :name="name"
    @click="onClick"
  >
    <div class="alternatives">
      <div
        class="alternative"
        v-for="(item, index) in items"
        :key="index"
      >
        <input
          name="radio"
          type="radio"
          :value="item"
          :id="`${item}-${index}`"
        >
        <label :for="`${item}-${index}`"> {{ item }} </label>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import QsContainer from '@/components/primitives/qsContainer.vue'
import QsProgress from '@/components/primitives/qsProgress.vue'
import QsButton from '@/components/primitives/qsButton.vue'

@Options({
  components: { QsButton, QsProgress, QsContainer },
  props: {
    items: Array,
    name: String
  }
})
export default class QsRadioGroup extends Vue {
  private readonly name!: string

  get form (): HTMLFormElement | null {
    return document.forms.namedItem(this.name)
  }

  private onClick () {
    this.$emit('value', this.form?.radio.value)
  }

  reset () {
    this.form?.reset()
    this.$emit('value', undefined)
  }
}

</script>

<style scoped lang="sass">
.alternatives
  display: flex
  flex-direction: column
  gap: 1em
  margin-bottom: 1em

  .alternative
    input[type=radio]
      appearance: none
      height: 1em
      width: 1em
      margin: 0 1em 0 0
      border: 1px solid var(--secondary)
      border-radius: 100%
      background-color: transparent
      transition: background-color 125ms ease-in-out

      &:checked
        background-color: var(--secondary)
</style>
