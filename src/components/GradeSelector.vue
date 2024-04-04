<script setup>
const { grade, gradeStatus } = defineProps(["grade"]);
const emit = defineEmits(["selectGrade"]);

const emitSelectGrade = (grade) => {
  emit("selectGrade", grade);
};
</script>

<template>
  <div class="inline-flex items-center">
    <label class="relative flex items-center rounded-full cursor-pointer">
      <input
        type="checkbox"
        :id="grade"
        @change="emitSelectGrade(grade)"
        class="peer relative appearance-none w-10 h-10 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-custom-orange before:rounded-md before:w-10 before:h-10 before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-custom-orange checked:custom-orange checked:before:custom-orange"
      />
      <span
        class="absolute peer-checked:text-black transition-opacity opacity-100 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 text-lg -translate-x-2/4 peer-checked:opacity-100"
        >{{ grade }}</span
      >
    </label>
  </div>
</template>
