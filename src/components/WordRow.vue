<script setup>
    const {word} = defineProps(["word"])
</script>

<template>
    <tr class="border-b-2 mb-8  border-custom-bg-light/25">
        <td>
            <p class="text-5xl py-4">{{word.kanji}}</p>
        </td>
        <td class="py-8">
            <p class="" v-for="readingOn in word.readings_on">{{readingOn}}</p>
        </td>
        <td class="py-8">
            <p v-for="readingKun in word.readings_kun">{{readingKun}}</p>
        </td>
        <td class="py-8">
            <p v-for="meaning in word.meanings">{{meaning}}</p>
        </td>
        <td class="py-8">
            <p>{{word.grade}}</p>
        </td>
    </tr>
</template>