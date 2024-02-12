<script setup>
    const props = defineProps(["word","kanji"])
</script>

<template>
    <tr class="border-b-2 mb-8  border-custom-bg-light/25">
        <td>
            <p class="text-5xl py-4">{{kanji}}</p>
        </td>
        <td class="py-8">
            <p class="" v-for="readingOn in props.word.readings_on">{{readingOn}}</p>
        </td>
        <td class="py-8">
            <p v-for="readingKun in props.word.readings_kun">{{readingKun}}</p>
        </td>
        <td class="py-8">
            <p v-for="meaning in props.word.meanings">{{meaning}}</p>
        </td>
        <td class="py-8">
            <p>{{props.word.grade}}</p>
        </td>
    </tr>
</template>