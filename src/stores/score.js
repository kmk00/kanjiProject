import { defineStore } from "pinia";
import { ref } from "vue";

export const useScoreStore = defineStore("score", () => {
  const score = ref({
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const incrementCorrectAnswers = () => {
    score.value.correctAnswers++;
  };

  const incrementWrongAnswers = () => {
    score.value.wrongAnswers++;
  };

  const resetScore = () => {
    score.value.correctAnswers = 0;
    score.value.wrongAnswers = 0;
  };

  return {
    score,
    incrementCorrectAnswers,
    incrementWrongAnswers,
    resetScore,
  };
});
