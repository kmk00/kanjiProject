<script setup>
    import FinalScore from './FinalScore.vue';
    import {getLimitedArrayLength} from '@/utils/useful'

    const { isGame, quiz, options } = defineProps(["isGame", "quiz", "options"])



</script>



<template>
    <div
        class="mt-6 p-4 min-h-40 select-none md:min-h-80 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
        <p v-if="!isGame" class="text-xl animate-fade-in md:text-4xl">Please select the options</p>
        <p v-else-if="isGame && options.selectFrom === 'kanji' && quiz.currentQuestionIndex < quiz.questionsArray.length"
            class="text-3xl animate-fade-in md:text-8xl">{{ quiz.questionsArray[quiz.currentQuestionIndex].kanji }}</p>
        <div
            v-else-if="isGame && options.selectFrom === 'hiragana' && quiz.currentQuestionIndex < quiz.questionsArray.length">
            <div class="animate-fade-in gap-10 md:text-2xl grid-cols-2">
                <div class="flex flex-col justify-center items-start">
                    <div v-if="quiz.questionsArray[quiz.currentQuestionIndex].readings_on.length > 0" class="flex-col gap-4">
                        <p>on: </p>
                        <div class="flex gap-4 flex-wrap ">
                            <p v-for="meaningIndex in quiz.questionsArray[quiz.currentQuestionIndex].readings_on.length ">{{
                                quiz.questionsArray[quiz.currentQuestionIndex].readings_on[meaningIndex - 1] }}</p>
                        </div>
                    </div>
                    <div v-if="quiz.questionsArray[quiz.currentQuestionIndex].readings_kun.length > 0" class="flex-col gap-4">
                        <p>kun: </p>
                        <div class="flex gap-4 flex-wrap">
                            <p v-for="meaningIndex in quiz.questionsArray[quiz.currentQuestionIndex].readings_kun.length ">{{
                                quiz.questionsArray[quiz.currentQuestionIndex].readings_kun[meaningIndex - 1] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else-if="isGame && options.selectFrom === 'english' && quiz.currentQuestionIndex < quiz.questionsArray.length">
            <div class="flex flex-wrap justify-center items-center animate-fade-in md:text-4xl">
                <p v-for="(meaningIndex,idx) in quiz.questionsArray[quiz.currentQuestionIndex].meanings.length ">{{
                quiz.questionsArray[quiz.currentQuestionIndex].meanings[meaningIndex - 1] }}{{ idx !== quiz.questionsArray[quiz.currentQuestionIndex].meanings.length - 1 ? ',&nbsp' : '' }} </p>
        </div>
        {{quiz.questionsArray[quiz.currentQuestionIndex].readings_on}}
    </div>
    <FinalScore v-else :total-questions="quiz.questionsArray.length" />
</div></template>