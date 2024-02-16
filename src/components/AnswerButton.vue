<script setup>
import { ref } from 'vue';
import {useScoreStore} from '@/stores/score'

const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz,keyid  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz","keyid"])

const scoreStore = useScoreStore()
const isCorrect = ref(null);
const isAnswered = ref(false)

const selectAnswer = (e) => {
    isAnswered.value = true
    if (e.currentTarget.id == correctAnswerIndex) {
        isCorrect.value = true
        scoreStore.incrementCorrectAnswers()
    } else {
        isCorrect.value = false
        scoreStore.incrementWrongAnswers()
    }
}
</script>

<template>
    <div>
        <Transition name="fade" appear>
            <!-- Button for english answers -->
            <button 
                v-if="selectTo === 'english'"
                :id="questionIndex" 
                :style="isAnswered && {backgroundColor: isCorrect ? '#0dd8549e' : '#923838d6'}" 
                @click="selectAnswer" 
                :disabled="isAnswered"  
                class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                <p v-for="meaningIndex in quiz.questionsArray[questionIndex].meanings.length ">{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}</p>
            </button>
        </Transition>
        <Transition name="fade" appear>
            <!-- Button for kanji answers -->
            <button 
                v-if="selectTo === 'kanji'"  
                :id="questionIndex"
                :disabled="isAnswered"
                :style="isAnswered && { backgroundColor: isCorrect ? '#2dc8639e' : '#923838d6' }" 
                @click="selectAnswer" 
                class="min-h-20 w-full disa p-2 hover:bg-custom-orange/20 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                <p class="md:text-5xl">{{ quiz.questionsArray[questionIndex].kanji }}</p>
            </button>
        </Transition>
        <Transition name="fade" appear>
            <!-- Button for hiragana answers -->
            <button 
                v-if="selectTo === 'hiragana'"  
                :id="questionIndex"
                :disabled="isAnswered" 
                :style="isAnswered && { backgroundColor: isCorrect ? '#0dd8549e' : '#923838d6' }" 
                @click="selectAnswer" 
                class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                <div class="grid grid-cols-2">
                    <div class="flex flex-col">
                        <p class="border-b border-custom-bg-light/85">on</p>
                        <p v-for="meaningIndex in quiz.questionsArray[questionIndex].readings_on.length ">{{ quiz.questionsArray[questionIndex].readings_on[meaningIndex-1]}}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="border-b border-custom-bg-light/85">kun</p>
                        <p v-for="meaningIndex in quiz.questionsArray[questionIndex].readings_kun.length ">{{ quiz.questionsArray[questionIndex].readings_kun[meaningIndex - 1] }}</p>
                    </div>
                </div>
            </button>
        </Transition>
    </div>
</template>

<style scoped>

.fade-enter-active{
    transition: opacity 0.5s ease;
}
.fade-enter-to{
    opacity: 1
}
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-leave-to{
    opacity: 0
}

</style>