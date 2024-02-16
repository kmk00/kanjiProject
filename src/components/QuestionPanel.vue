<script setup>
    import { useScoreStore } from '@/stores/score';

    const { isGame, quiz, options } = defineProps(["isGame", "quiz", "options"])
    const scoreStore = useScoreStore()

</script>



<template>
    <div class="mt-6 p-4 min-h-40 select-none md:min-h-80 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
        <p v-if="!isGame" class="text-xl animate-fade-in md:text-4xl">Please select the options</p>
        <p v-else-if="isGame && options.selectFrom === 'kanji' && quiz.currentQuestionIndex < quiz.questionsArray.length" class="text-3xl animate-fade-in md:text-8xl">{{ quiz.questionsArray[quiz.currentQuestionIndex].kanji }}</p>
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
            <p class="text-center text-sm">Number of questions: {{ quiz.questionsArray.length }} </p>
        </div>
    </div>
</template>