<script setup>
import { ref } from 'vue';
import {useScoreStore} from '@/stores/score'
import { getLimitedArrayLength } from '@/utils/useful'

const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz,keyid  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz","keyid"])


// Global score register right and wrong answers
const scoreStore = useScoreStore()
// Check if clicked answer is correct
const isCorrect = ref(null);
// Check if answer has been clicked
const isAnswered = ref(false)

const selectAnswer = (e) => {
    // After clicking button check if clicked answer is correct
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
                class="flex gap-1 flex-wrap min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                <p v-for="(meaningIndex, idx) in quiz.questionsArray[questionIndex].meanings.length " >{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}{{ idx !== quiz.questionsArray[questionIndex].meanings.length - 1 ? ', ' : '' }}</p>
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
                <div>
                    <div class="flex">
                        <p class="row-start-1 col-start-1 boreder-r-2 border-custom-bg-white  ">on: </p>
                        <div class="flex row-start-1 col-span-11 flex-wrap  ">
                            <p class="px-1" v-for="meaningIndex in getLimitedArrayLength(quiz.questionsArray[questionIndex].readings_on, 4) ">{{ quiz.questionsArray[questionIndex].readings_on[meaningIndex-1]}}</p>
                        </div>
                    </div>
                    <div class="flex">
                        <p class="row-start-2 col-start-1  border-custom-bg-white">kun: </p>
                        <div class="flex row-start-2 col-span-11 flex-wrap">
                            <p class=" px-1" v-for="meaningIndex in getLimitedArrayLength(quiz.questionsArray[questionIndex].readings_kun,4) ">{{ quiz.questionsArray[questionIndex].readings_kun[meaningIndex - 1] }}</p>
                        </div>
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