<template>
  <section id="skills" class="skill  section fp-tableCell relative flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 min-h-screen bg-white-100">
    <div class="space-y-8">

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
        <h2 class="text-2xl font-regular text-gray-700 py-2 px-4 border border-slate-300 rounded-full">
          My Skills
        </h2>
      </div>

      <div class="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="skill-card border border-slate-300 rounded-lg p-4 shadow-md transition-all duration-300"
        >
          <h3 class="text-lg font-bold mb-2">{{ skill.name }}</h3>
          <p class="text-gray-700 text-sm">{{ skill.description }}</p>
        </div>
      </div>
    </div>
    <!-- Indicateur de type -->
    <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
        <p class="text-slate-700 text-sm whitespace-nowrap uppercase mb-2">
          Skills
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 bg-slate-700"></div>
        </div>
      </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const skills = ref([
  { name: 'HTML & CSS', description: 'Maîtrise des concepts de base et avancés.' },
  { name: 'JavaScript', description: 'Expérience dans les frameworks modernes.' },
  { name: 'Vue.js', description: 'Création de SPA dynamiques avec Vue 3.' },
  { name: 'Node.js', description: 'Développement backend avec Node.js.' },
  { name: 'Git & GitHub', description: 'Versioning et collaboration avec Git.' },
]);

const handleScroll = () => {
  const section = document.getElementById('skills');
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
