<script setup>
import { useScoreStore } from '@/stores/score';
const { totalQuestions } = defineProps(["totalQuestions"])

const scoreStore = useScoreStore()


</script>


<template>
    <div class="animate-fade-in flex flex-col items-center justify-center">
        <p class="sm:text-xl md:text-3xl">Well done, check out your score!</p>
        <table class="mt-4 text-center">
            <thead class="text-sm md:text-md">
                <tr>
                    <th class="border border-gray-50">
                        <p class="p-1 sm:p-2">Correct</p>
                    </th>
                    <th class="border border-gray-50">
                        <p class="p-1 sm:p-2">Wrong</p>
                    </th>
                    <th class="border border-gray-50">
                        <p class="p-1 sm:p-2">Answers</p>
                    </th>
                    <th class="border border-gray-50">
                        <p class="p-1 sm:p-2">Questions</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-md md:text-xl">
                    <td class="border bg-[#0dd8549e] border-gray-50">
                        <p class="p-1 sm:p-2">{{ scoreStore.score.correctAnswers }}</p>
                    </td>
                    <td class="border bg-[#923838d6] border-gray-50">
                        <p class="p-1 sm:p-2">{{ scoreStore.score.wrongAnswers }}</p>
                    </td>
                    
                    <td class="border bg-gray-500 border-gray-50">
                        <p class="p-1 sm:p-2">{{ scoreStore.score.correctAnswers + scoreStore.score.wrongAnswers }}</p>
                    </td>
                    <td class="border bg-custom-orange/10 border-gray-50">
                        <p class="p-1 sm:p-2">{{ totalQuestions }}</p>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>