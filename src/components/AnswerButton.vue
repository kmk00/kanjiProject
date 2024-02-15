<script setup>
import { ref } from 'vue';
const { correctAnswerIndex, questionIndex,  selectFrom, selectTo, quiz,keyid  } = defineProps(["correctAnswerIndex", "questionIndex", "selectFrom", "selectTo", "quiz","keyid"])

const isCorrect = ref(null);


const selectAnswer = (e) => {
    if (e.currentTarget.id == correctAnswerIndex) isCorrect.value = true 
    console.log("\ncorrect answer index",correctAnswerIndex)
    console.log("button index", e.currentTarget.id)
    console.log("isCorrect",isCorrect.value)
    console.log("correct answer index", questionIndex)
    console.log("key",keyid)

}

</script>

<template>
    <div>
        keyid{{ keyid }}<br>
        correct answer index {{ correctAnswerIndex }}<br>
        question index {{ questionIndex }}
        <button :id="questionIndex" 
        :style="{backgroundColor: isCorrect ? 'green' : 'transparent'}" 
        @click="selectAnswer" v-if="selectTo === 'english'"  
        class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
            <p v-for="meaningIndex in quiz.questionsArray[questionIndex].meanings.length ">{{ quiz.questionsArray[questionIndex].meanings[meaningIndex-1]}}</p>
        </button>
        <button :id="questionIndex" 
        :style="{backgroundColor: isCorrect ? 'green' : 'transparent'}" 
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