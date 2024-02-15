<script setup>
import { ref, watch } from 'vue';
import { gsap } from 'gsap';
import WordRow from './WordRow.vue';
import words  from '@/assets/kanji.json';

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

const beforeEnter = (el) => {
    el.style.opacity = 0
    el.style.transform = 'translateX(10px)'
}

const enter = (el) => {
    gsap.to(el, {
        x: 0,
        duration: 0.3,
        opacity: 1,
    })
}

const leave = (el,done) => {
    gsap.to(el, {
        x: -10,
        opacity: 0,
        duration: 0.3,
        onComplete: done
    })
}


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
                    <TransitionGroup @enter="enter" @leave="leave" @before-enter="beforeEnter">
                        <WordRow v-for="(word,index) in filteredWords" :data-index="index" :key="word.kanji" :word="word"/>
                    </TransitionGroup>
                </tbody>
            </table>
        </div>
</template>