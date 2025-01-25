<template>
  <section id="skills" class="skill section fp-tableCell flex border border-slate-200 items-center w-full max-w-screen-lg mx-auto px-4 bg-white-100">
    <div class="w-full">
      <!-- Titre -->
      <div class="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          width="32px"
          height="32px"
          class="text-gray-500"
        >
          <path fill="#D8D4EA" d="M100.2,104H19c-5.5,0-10-4.5-10-10V29h98.7c6,0,10.7,5.3,9.9,11.2l-7.5,55C109.5,100.2,105.2,104,100.2,104 z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-700 py-2 px-4 border border-slate-300 rounded-full">
          My Skills
        </h2>
      </div>

      <!-- Contenu en deux colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Colonne gauche : Formation -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-700">Formation</h3>
          <ul class="list-disc list-inside space-y-2">
            <li class="text-gray-600 text-sm">
              Licence Informatique - Université de Reims
            </li>
            <li class="text-gray-600 text-sm">
              Formation Développement Web - OpenClassrooms
            </li>
            <li class="text-gray-600 text-sm">
              Certification Vue.js - Udemy
            </li>
          </ul>
        </div>

        <!-- Colonne droite : Study -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-700">Study</h3>
          <ul class="list-disc list-inside space-y-2">
            <li class="text-gray-600 text-sm">
              Vue.js Advanced Techniques
            </li>
            <li class="text-gray-600 text-sm">
              Node.js and Backend Development
            </li>
            <li class="text-gray-600 text-sm">
              Responsive Design with Tailwind CSS
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Indicateur de type -->
    <div
      v-if="isVisible"
      class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
    >
      <p class="text-slate-700 text-sm whitespace-nowrap uppercase">
        Skills
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  const section = document.getElementById("skills");
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value =
      rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
