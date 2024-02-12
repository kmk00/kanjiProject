<script setup>
import {  RouterLink,RouterView } from 'vue-router';

</script>

<template>
  <div>
      <nav class="mx-auto w-3/4 max-w-[1024px] flex justify-center gap-10 xl:gap-60 p-4 border-custom-orange border-b-2">
        <RouterLink to="/">QUIZ</RouterLink>
        <RouterLink to="/wordslist">WORDS LIST</RouterLink>
      </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>



