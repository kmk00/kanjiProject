<script setup>
import { ref, watch } from 'vue';

const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz"])

const isCorrect = ref(null);



const selectAnswer = (e) => {
    (e.currentTarget.id === correctAnswerIndex) ? isCorrect.value = true : isCorrect.value = false;
}

</script>

<template>
    <div>
        {{ questionIndex }}
        {{ correctAnswerIndex }}
        <button :id="questionIndex" :style="{backgroundColor: isCorrect && 'green'}" @click="selectAnswer" v-if="selectTo === 'hiragana'"  class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
            <p v-for="meaningIndex in quiz.questionsArray[questionIndex].meanings.length ">{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}</p>
        </button>
    </div>
</template>








<!-- <button v-else-if="options.selectTo === 'english'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
    <p v-for="meaning in quiz.questionArray[quiz.currentQuestionIndex].meanings">{{ meaning }}</p>
</button>
<button v-else-if="options.selectTo === 'hiragana'" class="min-h-20 w-full grid grid-cols-2 p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
    <div>
        <p class="border-b-2 border-custom-bg-light/25">on</p>
        <p v-for="reading in quiz.questionArray[quiz.currentQuestionIndex].readings_on">{{ reading }}</p>
    </div>
    <div>
        <p class="border-b-2 border-custom-bg-light/25">kun</p>
        <p v-for="reading in quiz.questionArray[quiz.currentQuestionIndex].readings_kun">{{ reading }}</p>
    </div>
</button> -->