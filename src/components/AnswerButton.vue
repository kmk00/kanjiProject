<script setup>
import { ref } from 'vue';
const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz"])

const isCorrect = ref(null);


const selectAnswer = (e) => {
    if (e.currentTarget.id == correctAnswerIndex) isCorrect.value = true      
}

</script>

<template>
    <div>
        <button :id="questionIndex" 
        :style="{backgroundColor: isCorrect ? 'green' : 'transparent'}" 
        @click="selectAnswer" v-if="selectTo === 'english'"  
        class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
            <p v-for="meaningIndex in quiz.questionsArray[questionIndex].meanings.length ">{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}</p>
        </button>
    </div>
</template>