<template>
  <qs-container absolute>
    <div class="title">Questionário</div>

    <qs-progress :progress="progress" />

    <div class="sub-title">Pergunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}</div>

    <div class="title">Pergunta {{ currentQuestionIndex + 1 }}</div>

    <div class="body">{{ question }}</div>

    <qs-radio-group
      :items="answers"
      name="quiz"
      @value="response = arguments[0]"
      ref="form"
    />

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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Options, Vue } from 'vue-class-component'
import QsContainer from '@/components/primitives/qsContainer.vue'
import QsProgress from '@/components/primitives/qsProgress.vue'
import QsButton from '@/components/primitives/qsButton.vue'
import IQuiz from '@/api/models/quiz/IQuiz'
import shuffleArray from '@/utils/ShuffleArray'
import parseBoolean from '@/utils/parseBoolean'
import QsRadioGroup from '@/components/smart/qsRadioGroup.vue'

@Options({
  components: { QsRadioGroup, QsButton, QsProgress, QsContainer }
})
export default class HomeView extends Vue {
  private readonly store = useStore()

  private readonly router = useRouter()

  private response = ''

  get correctAnswersCount (): number {
    return this.store.getters.GET_CORRECT_ANSWERS_COUNT
  }

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
    if (['', null, undefined].includes(this.response)) {
      return
    }

    const correctResponse = decodeURIComponent(this.currentQuestion?.correctAnswer || '')
    const isCorrect: boolean = (() => {
      if (this.currentQuestion?.type === 'multiple') {
        return this.response === correctResponse
      }

      if (this.currentQuestion?.type === 'boolean') {
        return parseBoolean(this.response) === parseBoolean(correctResponse)
      }

      throw new Error('Unknown question type')
    })()

    isCorrect && (await this.store.dispatch('ADD_CORRECT_ANSWER'));
    (this.$refs.form as QsRadioGroup).reset()

    if (!await this.store.dispatch('NEXT_QUESTION')) {
      const percentage = Math.round((this.correctAnswersCount / this.questions.length) * 100)
      await this.router.push(`/result/${percentage}`)
    }
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
</style>
