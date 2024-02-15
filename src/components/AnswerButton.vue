<script setup>
import { ref } from 'vue';
const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz,keyid  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz","keyid"])

const isCorrect = ref(null);
const isAnswered = ref(false)

const selectAnswer = (e) => {
    isAnswered.value = true
    if (e.currentTarget.id == correctAnswerIndex) isCorrect.value = true 
}

</script>

<template>
    <div>
        <button :id="questionIndex" 
        :style="isAnswered && {backgroundColor: isCorrect ? '#0dd8549e' : '#923838d6'}" 
        @click="selectAnswer" v-if="selectTo === 'english'"  
        class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
            <p v-for="meaningIndex in quiz.questionsArray[questionIndex].meanings.length ">{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}</p>
        </button>
        <button :id="questionIndex"
            :style="isAnswered && { backgroundColor: isCorrect ? '#2dc8639e' : '#923838d6' }" 
            @click="selectAnswer" v-if="selectTo === 'kanji'"  
            class="min-h-20 w-full disa p-2 hover:bg-custom-orange/20 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
            <p class="md:text-5xl">{{ quiz.questionsArray[questionIndex].kanji }}</p>
        </button>
        <button :id="questionIndex" 
        :style="isAnswered && { backgroundColor: isCorrect ? 'green' : '#923838d6' }" 
        @click="selectAnswer" v-if="selectTo === 'hiragana'"  
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
    </div>
</template>
