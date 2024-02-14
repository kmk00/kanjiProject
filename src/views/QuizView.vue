<script setup>
import GradeSelector from '@/components/GradeSelector.vue';
import { reactive, ref } from "vue";
import words  from '@/assets/kanji-jouyou.json';

let gradesSelected = reactive([{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }])
let filteredWords = ref([])
let options = reactive({
    grades: gradesSelected,
    selectFrom: '',
    selectTo: '',
    
})

const errorMessage = ref('')

const selectGrade = (grade) => {
    gradesSelected[grade - 1][grade] = !gradesSelected[grade - 1][grade]
}



const selectOptions = () => {

    if (checkIfAnythingSelected() == false || options.selectFrom == '' || options.selectTo == '') {
        errorMessage.value = 'Please provide all options.'
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

const checkIfAnythingSelected = () => {
    const anySelected = Object.values(options.grades).some((grade) => Object.values(grade).some((status) => status === true))
    return anySelected
}

const clearOptions = () => {
    options.selectFrom = ''
    options.selectTo = ''
    gradesSelected = [{ 1: false }, { 2: false }, { 3: false }, { 4: false }, { 5: false }, { 6: false }, { 7: false }, { 8: false }]
    options.grades = gradesSelected
    filteredWords.value = []
}


</script>

<template>
    <div class="w-[600px] mx-auto">
        <form v-if="filteredWords.length == 0">
            <div class="mt-8 flex md:flex-row md:gap-0 gap-2 flex-col md:grid-cols-2">
                <div class="flex self-center md:max-w-[193px] flex-wrap gap-2 items-center">
                    <GradeSelector v-for="i in 8" :key="i" :grade="i" :gradeStatus="gradesSelected[i - 1]" @selectGrade="selectGrade"/>
                    <!-- <label v-for="i in 8" class="relative flex items-center rounded-full cursor-pointer">
                        <input type="checkbox" 
                        class="peer relative appearance-none w-10 h-10 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-custom-orange before:rounded-md before:w-10 before:h-10  before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-custom-orange checked:custom-orange checked:before:custom-orange"/>
                        <span class="absolute peer-checked:text-black transition-opacity opacity-100 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 text-lg -translate-x-2/4 peer-checked:opacity-100">{{ i }}</span>
                    </label> -->
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
        <div v-if="filteredWords.length > 0" class="mt-4 grid grid-cols-2 gap-2">
            <input type="text" class="h-full p-2 border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer " :placeholder="filteredWords.length">
            <div class="grid grid-cols-2 gap-2">
                <button @click="selectOptions" class="p-2 border hover:bg-custom-orange/10 transition-all rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer">Start</button>
                <button @click="clearOptions" class="p-2 border rounded-md hover:bg-custom-orange/10 transition-all bg-custom-bg border-blue-gray-200 cursor-pointer">Reset</button>
            </div>
        </div>
        <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
        <div class="mt-6 p-4 min-h-40 md:min-h-80 max-w-[600px] flex justify-center items-center border rounded-md bg-custom-bg border-blue-gray-200">
            <p class="md:text-8xl">Kanji</p>
        </div>
        <div class="grid md:mt-8 mt-4 grid-cols-2 gap-2">
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 1</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 2</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 3</button>
            <button class="min-h-20 p-2 hover:bg-custom-orange/10 transition-all border rounded-md bg-custom-bg border-blue-gray-200 cursor-pointer ">Answer 4</button>            
        </div>
    </div>
</template>