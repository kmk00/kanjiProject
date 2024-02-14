<script setup>
import GradeSelector from '@/components/GradeSelector.vue';
import { reactive, ref } from "vue";
import words  from '@/assets/kanji.json';

let gradesSelected = reactive([{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }])
let filteredWords = ref([])
let options = reactive({
    grades: gradesSelected,
    selectFrom: '',
    selectTo: '',  
})

let quiz = ref({
    numberOfQuestions: null,
    questionArray: [],
})


const isGame = ref(false)

const errorMessage = ref('')

const selectGrade = (grade) => {
    //Grade selection
    gradesSelected[grade - 1][grade] = !gradesSelected[grade - 1][grade]
}


const selectOptions = () => {
    //Options selection
    if (checkIfGradesInOptionSelected() == false || options.selectFrom == '' || options.selectTo == '') {
        errorMessage.value = 'Please provide all options.'
        return
    }

    if(options.selectFrom === options.selectTo){
        errorMessage.value = 'Please provide different options.'
        return
    }
    errorMessage.value = ''

    let gradesToFilter = []

    for (let i = 0; i < options.grades.length; i++) {
        if (Object.values(options.grades[i])[0]) {
            gradesToFilter.push(i + 1);
        }
    }
    filteredWords.value = Object.values(words).filter(word => gradesToFilter.includes(word.grade))
        .map(word => ({ ...word, kanji: Object.keys(words).find(key => words[key] === word) }));   
}

const checkIfGradesInOptionSelected = () => {
    const anySelected = Object.values(options.grades).some((grade) => Object.values(grade).some((status) => status === true))
    return anySelected
}

const clearOptions = () => {
    isGame.value = false
    options.selectFrom = ''
    options.selectTo = ''
    gradesSelected = [{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }]
    options.grades = gradesSelected
    filteredWords.value = []
    errorMessage.value = ''
    quiz.value = {
        numberOfQuestions: null,
        questionArray: [],
    }
}

const initialiseQuiz = () => {

    if (quiz.value.numberOfQuestions < 1 || quiz.value.numberOfQuestions > filteredWords.value.length) {
        errorMessage.value = 'Please provide valid number of questions.'
        return
    }
    isGame.value = true
    quiz.value.questionArray = pickQuestionsToQuiz(filteredWords.value, quiz.value.numberOfQuestions)
    
}

const pickQuestionsToQuiz = (questionsArray,number) => {
    const arrayCopy = questionsArray.slice();

    const pickedQuestions = [];
    for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);

        pickedQuestions.push(arrayCopy[randomIndex]);
        arrayCopy.splice(randomIndex, 1);
    }
    return pickedQuestions
}




</script>

<template>
    <div class="w-3/4 md:w-[600px] mx-auto">
        {{ quiz }}
        <form v-if="filteredWords.length == 0">
            <div class="mt-8 flex md:flex-row md:gap-0 gap-2 flex-col md:grid-cols-2">
                <div class="flex self-center md:max-w-[193px] flex-wrap gap-2 items-center">
                    <GradeSelector v-for="i in 8" :key="i" :grade="i" :gradeStatus="gradesSelected[i - 1]" @selectGrade="selectGrade"/>
                </div>
                <div class="grid grid-cols-2 grid-rows-2 gap-2 w-full">
                    <select v-model="options.selectFrom" class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer" placeholder="" >
                        <option class="">kanji</option>
                        <option class="">hiragana</option>
                        <option class="">english</option>
                    </select>
                    <button @click.prevent="selectOptions" class=" row-span-2 hover:bg-custom-orange/10 transition-all p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Confirm</button>
                    <select v-model="options.selectTo" class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                        <option>hiragana</option>
                        <option>kanji</option>
                        <option>english</option>
                    </select>
                </div>
            </div>
        </form>
        <div v-if="filteredWords.length > 0" class="mt-4">
            <p class="text-xl p-2">How many words do you want?</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="number" v-model="quiz.numberOfQuestions" :disabled="isGame" class="h-full p-2 border rounded-md disabled:text-gray-500 bg-custom-bg border-blue-gray-200 cursor-pointer " :placeholder="'From 4 to ' + filteredWords.length">
                <div class="grid grid-cols-2 gap-2">
                    <button @click="initialiseQuiz" class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer">Start</button>
                    <button @click="clearOptions" class="p-2 border rounded-md hover:bg-custom-orange/10 transition-all bg-custom-bg border-blue-gray-200 cursor-pointer">Reset</button>
                </div>
            </div>
        </div>
        <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        <div class="mt-6 p-4 min-h-40 md:min-h-80 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
            <p v-if="!isGame" class="text-xl md:text-4xl">Please select the options</p>
            <p v-else-if="isGame && options.selectFrom === 'kanji'" class="text-3xl md:text-8xl">{{ quiz.questionArray[0].kanji }}</p>
            <p v-else-if="isGame && options.selectFrom === 'english'" class="text-3xl md:text-8xl">english</p>
            <p v-else-if="isGame && options.selectFrom === 'hiragana'" class="text-3xl md:text-8xl">hiragana</p>
        </div>
        <div class="grid md:mt-8 mt-4 grid-cols-2 gap-2">
            <div>
                <button v-if="isGame && options.selectTo === 'kanji'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">kanji</button>
                <button v-else-if="isGame && options.selectTo === 'english'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">english</button>
                <button v-else-if="isGame && options.selectTo === 'hiragana'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">hiragana</button>
            </div>
            <div>
                <button v-if="isGame && options.selectTo === 'kanji'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">kanji</button>
                <button v-else-if="isGame && options.selectTo === 'english'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">english</button>
                <button v-else-if="isGame && options.selectTo === 'hiragana'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">hiragana</button>
            </div>
            <div>
                <button v-if="isGame && options.selectTo === 'kanji'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">kanji</button>
                <button v-else-if="isGame && options.selectTo === 'english'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">english</button>
                <button v-else-if="isGame && options.selectTo === 'hiragana'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">hiragana</button>
            </div>
            <div>
                <button v-if="isGame && options.selectTo === 'kanji'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">kanji</button>
                <button v-else-if="isGame && options.selectTo === 'english'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">english</button>
                <button v-else-if="isGame && options.selectTo === 'hiragana'" class="min-h-20 w-full p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">hiragana</button>
            </div>

        </div>
    </div>
</template>