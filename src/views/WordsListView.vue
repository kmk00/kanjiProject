<script setup>
import GradeSelector from "@/components/GradeSelector.vue";
import WordsTable from "@/components/WordsTable.vue";

import { reactive } from "vue";

let gradesSelected = reactive([{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }])

const selectGrade = (grade) => {
    gradesSelected[grade - 1][grade] = !gradesSelected[grade - 1][grade]
}
</script>

<template>
    <div>
        <div>
            <h1 class="text-center mt-8 text-xl">Select Grade</h1>
            <div class="md:flex mt-4 grid grid-cols-4 gap-2 w-fit mx-auto md:p-4 md:justify-center">
                <GradeSelector v-for="i in 8" :key="i" :grade="i" :gradeStatus="gradesSelected[i-1]" @selectGrade="selectGrade"/>
            </div>
        </div>
        <WordsTable :gradesSelected="gradesSelected"/>
    </div>
</template>