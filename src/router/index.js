import { createRouter, createWebHistory } from "vue-router";
import QuizViewVue from "@/views/QuizView.vue";
import WordsListViewVue from "@/views/WordsListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quiz",
      component: QuizViewVue,
    },
    {
      path: "/wordslist",
      name: "wordslist",
      component: WordsListViewVue,
    },
  ],
});

export default router;
