<script setup>
import {  RouterLink,RouterView } from 'vue-router';

</script>

<template>
  <div>
    <nav class="mx-auto w-3/4 max-w-[1024px] flex justify-center gap-10 xl:gap-60 p-4 border-custom-orange/20 border-b-2">
      <RouterLink to="/">QUIZ</RouterLink>
      <RouterLink to="/wordslist">WORDS LIST</RouterLink>
    </nav>
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>


<style>

.fade-enter-active{
    transition: opacity 0.5s ease;
}

.fade-enter-to{
    opacity: 1;
}

.fade-enter-from{
    opacity: 0;
}

</style>

