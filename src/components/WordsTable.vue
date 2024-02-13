<script setup>
import { defineProps, ref, watch } from 'vue';
import WordRow from './WordRow.vue';
import words  from '@/assets/kanji-jouyou.json';

const { gradesSelected } = defineProps(["gradesSelected"])

let filteredWords = ref([])

watch(gradesSelected, () => {

    let gradesToFilter = []
    for (let i = 0; i < gradesSelected.length; i++) {
        if (Object.values(gradesSelected[i])[0]) {
            gradesToFilter.push(i+1);
        }
    }
        filteredWords.value = Object.values(words).filter(word => gradesToFilter.includes(word.grade))
        .map(word => ({ ...word, kanji: Object.keys(words).find(key => words[key] === word) }));
})
</script>

<template>
    <div class="mt-4">
            <table class="mx-auto text-xl w-3/4 max-w-[980px] text-center ">
                <thead>
                    <tr>
                        <th>
                            <p class="my-4 py-4">Kanji</p>
                        </th>
                        <th>
                            <p>Reading on</p>
                        </th>
                        <th>
                            <p>Reading kun</p>
                        </th>
                        <th>
                            <p>meaning</p>
                        </th>
                        <th>
                            <p>grade</p>
                        </th>
                    </tr>
                </thead>
                <tbody >
                    <WordRow v-for="(word) in filteredWords" :word="word"/>
                </tbody>
            </table>
        </div>
</template>