<script setup>

const { quiz } = defineProps(["quiz"])
const calculateProgress = () => {
    // Calculates progress of the quiz
    return ((quiz.currentQuestionIndex) / (quiz.questionsArray.length)) * 100
}

</script>

<template>
    <div class="w-full border rounded-md border-blue-gray-200">
        <div :style="`width: ${calculateProgress()}%`" class="bg-custom-orange h-full"></div>
    </div>
</template>