<template>
  <qs-container absolute>
    <div class="title">Questionário</div>

    <qs-progress :progress="progress" />

    <div class="sub-title">Pergunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}</div>

    <div class="title">Pergunta {{ currentQuestionIndex + 1 }}</div>

    <div class="body">{{ question }}</div>

    <form name="quiz">
      <div class="alternatives">
          <div
            class="alternative"
            v-for="(item, index) in answers"
            :key="index"
          >
            <input
              name="answer"
              type="radio"
              :value="item"
              :id="`${item}-${index}`"
            >
            <label :for="`${item}-${index}`"> {{ item }} </label>
          </div>
      </div>
    </form>
    <qs-button
      background-color="var(--secondary)"
      color="#FFF"
      @click="confirm"
    >
      Avançar
    </qs-button>
  </qs-container>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { Options, Vue } from 'vue-class-component'
import QsContainer from '@/components/primitives/qsContainer.vue'
import QsProgress from '@/components/primitives/qsProgress.vue'
import QsButton from '@/components/primitives/qsButton.vue'
import IQuiz from '@/api/models/quiz/IQuiz'
import shuffleArray from '@/utils/ShuffleArray'
import parseBoolean from '@/utils/parseBoolean'

@Options({
  components: { QsButton, QsProgress, QsContainer }
})
export default class HomeView extends Vue {
  private readonly store = useStore()

  get questions (): IQuiz[] {
    return this.store.getters.GET_QUESTIONS
  }

  get currentQuestionIndex (): number {
    return this.store.getters.GET_CURRENT_QUESTION_INDEX
  }

  get currentQuestion (): IQuiz | null {
    return this.store.getters.GET_CURRENT_QUESTION
  }

  get question (): string {
    return decodeURIComponent(this.currentQuestion?.question || '')
  }

  get answers (): string[] {
    if (this.currentQuestion === null) {
      return []
    }

    if (this.currentQuestion.type === 'boolean') {
      return ['Yes', 'No']
    }

    const arr = [...(this.currentQuestion.incorrectAnswers || []).map(decodeURIComponent), decodeURIComponent(this.currentQuestion.correctAnswer)]
    shuffleArray(arr)

    return arr
  }

  get progress (): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100
  }

  async confirm () {
    const form: HTMLFormElement | null = document.forms.namedItem('quiz')
    const response = form?.answer.value

    if (['', null, undefined].includes(response)) {
      return
    }

    const correctResponse = decodeURIComponent(this.currentQuestion?.correctAnswer || '')

    const radio = [...form?.answer].find(el => (el as HTMLInputElement).value === response) as HTMLInputElement
    let isCorrect

    if (this.currentQuestion?.type === 'multiple') {
      isCorrect = response === correctResponse
    } else if (this.currentQuestion?.type === 'boolean') {
      isCorrect = parseBoolean(response) === parseBoolean(correctResponse)
    }

    if (isCorrect) {
      radio.classList.add('correct')
    }

    await new Promise((resolve) => setTimeout(resolve, 250))
    radio.classList.remove('correct')
    form?.reset()

    await this.store.dispatch('NEXT_QUESTION')
  }

  mounted () {
    this.store.dispatch('LOAD_QUIZ', new Date().getTime())
  }
}

</script>

<style scoped lang="sass">
.title
  color: var(--secondary)
  font-weight: bold
  margin-bottom: 2em

.sub-title
  color: rgba(125, 125, 125, 1)
  margin-bottom: 1em
  margin-top: 0.5em
  font-size: 0.8em

.body
  color: rgba(0, 0, 0, 0.75)
  margin-bottom: 1em
  overflow-wrap: break-word

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

      &.correct
        background-color: #56E527FF
        border: 1px solid #56E527FF

</style>
