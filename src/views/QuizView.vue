<script setup>
    import { reactive, ref, watch } from "vue";
    import {uuid} from 'vue-uuid';
    import words  from '@/assets/kanji.json';
    import { useScoreStore } from '@/stores/score';
    import {shuffleArray} from '@/utils/useful'

    import GradeSelector from '@/components/GradeSelector.vue';
    import AnswerButton from '@/components/AnswerButton.vue';
    import QuestionPanel from '@/components/QuestionPanel.vue';
    import ProgressBar from '@/components/ProgressBar.vue';

    // Global score register right and wrong answers
    const scoreStore = useScoreStore()
    // Check if game is in progress
    const isGame = ref(false)
    // Stores error message
    const errorMessage = ref('')

    // Keep track of selected grades in form options 
    let gradesSelected = reactive([{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }])

    // Table of words filtered by grade
    let filteredWordsByGrade = ref([])

    // Quiz options
    let options = reactive({
        grades: gradesSelected,
        selectFrom: '',
        selectTo: '',  
    })

    // Quiz variables
    let quiz = ref({
        numberOfQuestions: null,
        currentQuestionIndex: null,
        questionsArray: [],
        answersIndexes: [],
        uniqueIndexes: []
    })

    watch(() => quiz.value.currentQuestionIndex, () => {
        // Keeps track of current question index and 
        if (quiz.value.currentQuestionIndex >= quiz.value.questionsArray.length) {
            return
        }    

        // Prepares answers indexes
        prepareAnswersIndexes()
        
        // Prepares unique indexes for answer buttons when the question changes 
        // Essential when the same answer which was correct is shown again in the next question as wrong 
        for (let i = 0; i < quiz.value.answersIndexes.length; i++) {
            quiz.value.uniqueIndexes.push(uuid.v4());
        }

    })

    const selectGrade = (grade) => {
        //Grade selection in form - GradeSelector component 
        gradesSelected[grade - 1][grade] = !gradesSelected[grade - 1][grade]
    }

    const selectOptions = () => {
        //Validation of selected options
        if (checkIfGradesInOptionSelected() == false || options.selectFrom == '' || options.selectTo == '') {
            errorMessage.value = 'Please provide all options.'
            return
        }

        if(options.selectFrom === options.selectTo){
            errorMessage.value = 'Please provide different options.'
            return
        }
        
        errorMessage.value = ''

        //Create array of selected grades
        let gradesToFilter = []
        for (let i = 0; i < options.grades.length; i++) {
            if (Object.values(options.grades[i])[0]) {
                gradesToFilter.push(i + 1);
            }
        }

        // Filter words by selected grades
        filteredWordsByGrade.value = Object.values(words).filter(word => gradesToFilter.includes(word.grade))
            .map(word => ({ ...word, kanji: Object.keys(words).find(key => words[key] === word) }));   

        if(filteredWordsByGrade.value.length < 4){
            errorMessage.value = 'No words for selected grades.'
        }
    }

    const checkIfGradesInOptionSelected = () => {
        // Check if any grade is selected
        const anySelected = Object.values(options.grades).some((grade) => Object.values(grade).some((status) => status === true))
        return anySelected
    }

    const clearOptions = () => {
        // Clear all options
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
        // Validation of number of questions
        if (quiz.value.numberOfQuestions < 4 || quiz.value.numberOfQuestions > filteredWordsByGrade.value.length) {
            errorMessage.value = 'Please provide valid number of questions.'
            return
        }

        errorMessage.value = ''

        isGame.value = true

        quizToBeginning()
        quiz.value.questionsArray = pickQuestionsToQuiz(filteredWordsByGrade.value, quiz.value.numberOfQuestions)
}

    const quizToBeginning = () => {
        scoreStore.resetScore()
        quiz.value.questionsArray = shuffleArray(quiz.value.questionsArray)
        quiz.value.currentQuestionIndex = 0
    }

    const pickQuestionsToQuiz = (questionsArray,number) => {
        // Pick questions to quiz based on number of questions and save it in an array

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
        // Prepares answers indexes for current question
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
        // Prepares next question
        if (quiz.value.currentQuestionIndex >= quiz.value.questionsArray.length) {
            return
        }

        quiz.value.uniqueIndexes = [];
        quiz.value.currentQuestionIndex++
}


    
</script>

<template>
    <div class="w-3/4 md:w-[600px] mx-auto">
        <form v-if="filteredWordsByGrade.length == 0">
            <h1 class="mt-4 text-center text-xl p-2 md-text">Select Grade</h1>
            <div class=" animate-fade-in  flex md:flex-row md:gap-0 gap-2 flex-col md:items-center md:grid-cols-2">
                <div class="flex self-center max-w-[200px] mb-3 md:mb-0 md:max-w-[193px] flex-wrap gap-2 items-center">
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
            <p class="py-2" v-else-if="isGame && quiz.currentQuestionIndex < quiz.questionsArray.length">Question: {{ quiz.currentQuestionIndex }} / {{ quiz.questionsArray.length}}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                    v-if="!isGame" 
                    type="number" 
                    v-model="quiz.numberOfQuestions" 
                    :disabled="isGame" 
                    class="h-full p-2 border rounded-md disabled:text-gray-500 bg-custom-bg border-blue-gray-200 cursor-pointer " 
                    :placeholder="'From 4 to ' + filteredWordsByGrade.length">
                <ProgressBar 
                    v-if="isGame && quiz.currentQuestionIndex < quiz.questionsArray.length" 
                    :quiz="quiz"/>
                <button v-if="isGame && quiz.currentQuestionIndex >= quiz.questionsArray.length" 
                    @click="initialiseQuiz" 
                    class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer"
                    >Try again with different set</button>
                <div class="grid grid-cols-2 gap-2">
                    <button 
                        v-if="!isGame" 
                        @click="initialiseQuiz" 
                        class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer"
                        >Start</button>
                    <button 
                        v-else-if="isGame && quiz.currentQuestionIndex < quiz.questionsArray.length" 
                        @click="nextQuestion" 
                        class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer"
                        >Next Question</button>
                    <button 
                        v-else-if="isGame && quiz.currentQuestionIndex >= quiz.questionsArray.length" 
                        @click="quizToBeginning" 
                        class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer"
                        >Restart</button>
                    <button 
                        @click="clearOptions" 
                        class="p-2 border rounded-md hover:bg-custom-orange/10 transition-all bg-custom-bg border-blue-gray-200 cursor-pointer"
                        >Options</button>
                </div>
            </div>
        </div>
        <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        <QuestionPanel :is-game="isGame" :quiz="quiz" :options="options" />
        <div class="grid md:mt-8 mt-4 grid-cols-2 gap-2">
            <AnswerButton 
                v-if="isGame && quiz.currentQuestionIndex < quiz.questionsArray.length" 
                v-for="(questionIndex, id) in quiz.answersIndexes" 
                :key="quiz.uniqueIndexes[id]" 
                :keyid="quiz.uniqueIndexes[id]" 
                :correctAnswerIndex="quiz.currentQuestionIndex" 
                :questionIndex="questionIndex" 
                :selectFrom="options.selectFrom" 
                :selectTo="options.selectTo" 
                :quiz="quiz"/>
        </div>
    </div>
</template>