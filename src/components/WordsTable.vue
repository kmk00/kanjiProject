<script setup>
import WordRow from './WordRow.vue';
import words from '../assets/kanji-jouyou.json';

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
                    <WordRow v-for="(word,kanji) in words" :key="kanji" :kanji="kanji" :word="word" />
                </tbody>
            </table>
        </div>
</template>