<script setup>
import GradeSelector from '@/components/GradeSelector.vue';
import { reactive, ref, watch } from "vue";
import words  from '@/assets/kanji.json';
import AnswerButton from '@/components/AnswerButton.vue';
import {uuid} from 'vue-uuid';
import { useScoreStore } from '@/stores/score';

const scoreStore = useScoreStore()
const isGame = ref(false)
const errorMessage = ref('')

// Options selection for grade in form 
let gradesSelected = reactive([{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }])

// Table of words filtered by grade
let filteredWordsByGrade = ref([])

// Quiz options
let options = reactive({
    grades: gradesSelected,
    selectFrom: '',
    selectTo: '',  
})


let quiz = ref({
    numberOfQuestions: null,
    currentQuestionIndex: null,
    questionsArray: [],
    answersIndexes: [],
    uniqueIndexes: []
})


const selectGrade = (grade) => {
    //Grade selection
    gradesSelected[grade - 1][grade] = !gradesSelected[grade - 1][grade]
}


watch(() => quiz.value.currentQuestionIndex, () => {
    if (quiz.value.currentQuestionIndex >= quiz.value.questionsArray.length) {
        return
    }    
    prepareAnswersIndexes()
    for (let i = 0; i < quiz.value.answersIndexes.length; i++) {
        quiz.value.uniqueIndexes.push(uuid.v4());
    }
})


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
    filteredWordsByGrade.value = Object.values(words).filter(word => gradesToFilter.includes(word.grade))
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
    filteredWordsByGrade.value = []
    errorMessage.value = ''
    quiz.value = {
        numberOfQuestions: null,
        questionsArray: [],
        currentQuestionIndex: null,
        answersIndexes: [],
        uniqueIndexes: []
    }
    scoreStore.resetScore()
}

const initialiseQuiz = () => {
    if (quiz.value.numberOfQuestions < 4 || quiz.value.numberOfQuestions > filteredWordsByGrade.value.length) {
        errorMessage.value = 'Please provide valid number of questions.'
        return
    }

    isGame.value = true
    quiz.value.currentQuestionIndex = 0

    quiz.value.questionsArray = pickQuestionsToQuiz(filteredWordsByGrade.value, quiz.value.numberOfQuestions)
    
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

const prepareAnswersIndexes = () => {
    quiz.value.answersIndexes = [];
    quiz.value.answersIndexes.push(quiz.value.currentQuestionIndex);
    for (let i = 0; i < 3; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * quiz.value.questionsArray.length);
        } while (quiz.value.answersIndexes.includes(index)); 
        quiz.value.answersIndexes.push(index);
    }

    quiz.value.answersIndexes = shuffleArray(quiz.value.answersIndexes);

}

const nextQuestion = () => {
    if (quiz.value.currentQuestionIndex >= quiz.value.questionsArray.length) {
        return
    }

    quiz.value.uniqueIndexes = [];
    quiz.value.currentQuestionIndex++
}

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const calculateProgress = () => {
    return ((quiz.value.currentQuestionIndex) / (quiz.value.questionsArray.length)) * 100
}


</script>

<template>
    <div class="w-3/4 md:w-[600px] mx-auto">
        <form v-if="filteredWordsByGrade.length == 0">
            <div class="mt-8 animate-fade-in  flex md:flex-row md:gap-0 gap-2 flex-col md:grid-cols-2">
                <div class="flex self-center md:max-w-[193px] flex-wrap gap-2 items-center">
                    <GradeSelector v-for="i in 8" :key="i" :grade="i" :gradeStatus="gradesSelected[i - 1]" @selectGrade="selectGrade"/>
                </div>
                <div class="grid grid-cols-2 grid-rows-2 gap-2 w-full">
                    <select v-model="options.selectFrom" class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer" placeholder="" >
                        <option value="" disabled>Select from</option>
                        <option class="">kanji</option>
                        <option class="">hiragana</option>
                        <option class="">english</option>
                    </select>
                    <button @click.prevent="selectOptions" class=" row-span-2 hover:bg-custom-orange/10 transition-all p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Confirm</button>
                    <select v-model="options.selectTo" class="h-10 p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">
                        <option value="" disabled>Select to</option>
                        <option>kanji</option>
                        <option>hiragana</option>
                        <option>english</option>
                    </select>
                </div>
            </div>
        </form>
        <div v-if="filteredWordsByGrade.length > 0" class="animate-fade-in mt-4">
            <p v-if="!isGame" class="text-xl p-2">How many words do you want?</p>
            <p v-else>{{ quiz.currentQuestionIndex }} / {{ quiz.questionsArray.length}}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input v-if="!isGame" type="number" v-model="quiz.numberOfQuestions" :disabled="isGame" class="h-full p-2 border rounded-md disabled:text-gray-500 bg-custom-bg border-blue-gray-200 cursor-pointer " :placeholder="'From 4 to ' + filteredWordsByGrade.length">
                <div v-else  class="w-full border rounded-md border-blue-gray-200">
                    <div :style="`width: ${calculateProgress()}%`" class="bg-custom-orange h-full"></div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <button v-if="!isGame" @click="initialiseQuiz" class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer">Start</button>
                    <button v-else @click="nextQuestion" class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer">Next Question</button>
                    <button @click="clearOptions" class="p-2 border rounded-md hover:bg-custom-orange/10 transition-all bg-custom-bg border-blue-gray-200 cursor-pointer">Reset</button>
                </div>
            </div>
        </div>
        <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        <div @dblclick="nextQuestion" class="mt-6 p-4 min-h-40 select-none md:min-h-80 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
            <p v-if="!isGame" class="text-xl animate-fade-in md:text-4xl">Please select the options</p>
            <p v-else-if="isGame && options.selectFrom === 'kanji' && quiz.currentQuestionIndex < quiz.questionsArray.length " class="text-3xl animate-fade-in md:text-8xl">{{ quiz.questionsArray[quiz.currentQuestionIndex].kanji }}</p>
            <div v-else-if="isGame && options.selectFrom === 'hiragana' && quiz.currentQuestionIndex < quiz.questionsArray.length" >
                <div class="grid animate-fade-in gap-10 md:text-2xl grid-cols-2">
                    <div class="flex flex-col">
                        <p class="border-b border-custom-bg-light/85">on</p>
                        <p v-for="meaningIndex in quiz.questionsArray[quiz.currentQuestionIndex].readings_on.length ">{{ quiz.questionsArray[quiz.currentQuestionIndex].readings_on[meaningIndex - 1] }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="border-b border-custom-bg-light/85">kun</p>
                        <p v-for="meaningIndex in quiz.questionsArray[quiz.currentQuestionIndex].readings_kun.length ">{{ quiz.questionsArray[quiz.currentQuestionIndex].readings_kun[meaningIndex - 1] }}</p>
                    </div>
                </div>
            </div>
            <div v-else-if="isGame && options.selectFrom === 'english' && quiz.currentQuestionIndex < quiz.questionsArray.length" >
                <div class="flex animate-fade-in flex-col md:text-6xl">
                    <p v-for="meaningIndex in quiz.questionsArray[quiz.currentQuestionIndex].readings_on.length ">{{ quiz.questionsArray[quiz.currentQuestionIndex].meanings[meaningIndex - 1] }}</p>
                </div>
            </div>
            <div v-else class="animate-fade-in">
                <p class="text-3xl">Well done! Your score:</p>
                <p class="text-center text-custom-green text-xl">Correct answers: {{ scoreStore.score.correctAnswers }}</p> 
                <p class="text-center text-custom-red text-xl">Wrong answers: {{ scoreStore.score.wrongAnswers }}</p> 
            </div>
        </div>
        <div class="grid md:mt-8 mt-4 grid-cols-2 gap-2">
            <AnswerButton v-if="isGame && quiz.currentQuestionIndex < quiz.questionsArray.length" v-for="(questionIndex, id) in quiz.answersIndexes" :key="quiz.uniqueIndexes[id]" :keyid="quiz.uniqueIndexes[id]" :correctAnswerIndex="quiz.currentQuestionIndex" :questionIndex="questionIndex" :selectFrom="options.selectFrom" :selectTo="options.selectTo" :quiz="quiz"/>
        </div>
    </div>
</template>