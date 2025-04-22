<template>
  <section id="profile" :class="[
      'profile section pt-30 h-screen flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]">
    <div class="flex flex-col md:flex-row items-center justify-center w-full h-full space-y-8 md:space-y-0 md:space-x-16">
      <!-- Colonne gauche -->
      <div class="md:w-1/2 flex flex-col justify-center items-start text-left">
        <h1 class="text-3xl font-semibold mb-4 transition duration-300"
          :class="isDarkMode ? 'text-white' : 'text-slate-700'"
      >
          Hello,<br> my name is Manon
        </h1>

        <p class="text-lg mb-6 leading-loose font-light transition duration-300 p-4 rounded-lg"
          :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
          {{ profile?.description || 'Chargement de la description...' }}
        </p>

        <a href="/CV MAJ 2025 ENG.png" class="text-base font-bold underline self-start transition duration-300"
          :class="isDarkMode ? 'text-gray-300 hover:text-gray-400' : 'text-slate-700 hover:text-gray-600'"
        >
          Get My Resume
        </a>
      </div>

      <div class="relative md:w-1/2 flex justify-center items-center">
        <img :src="profileImage" alt="Manon Le Bouard" class="w-64 h-64 object-cover transition duration-300">
      </div>

      <!-- Indicateur de scroll -->
      <div
      class="scrollDownIndicator fixed bottom-4 left-4 flex hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
        :class="[{ 'opacity-0': hasScrolled, 'opacity-100': !hasScrolled }, isDarkMode ? 'text-gray-200' : 'text-slate-700']"
      >
        <p class="text-sm rotate-90 whitespace-nowrap mb-20 uppercase"
        :class = "isDarkMode ? 'text-gray-400' : 'text-slate-700'">
          Scroll Down
        </p>
        
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-5 md:h-25 lg:h-35 transition duration-300"
            :class="isDarkMode ? 'bg-gray-400' : 'bg-slate-700'">
          </div>
        </div>
      </div>

      <!-- Indicateur de type -->
      <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
      <p class="text-sm whitespace-nowrap uppercase mb-2 transition duration-300"
          :class="isDarkMode ? 'text-gray-400' : 'text-slate-700'">
          Profile
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 transition duration-300"
            :class="isDarkMode ? 'bg-gray-400' : 'bg-slate-700'">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import axios from 'axios';

const isDarkMode = inject('isDarkMode');
const sections = ['profile', 'skills', 'projects', 'contact'];
const activeSection = ref('profile');
const isVisible = ref(false);
const hasScrolled = ref(false);
const profileImage = ref('/pnj-portfolio.png');

const { data: profile } = useAsyncData('profile', async () => {
  try {
    const response = await axios.get('https://strapi.mlebouard.fr/api/profils/');
    const data = response.data.data[0];
    return {
      Titre: data.Titre || 'Manon Le Bouard',
      description: data.description || 'Développeuse web et mobile',
    };
  } catch (error) {
    return {
      Titre: 'Manon Le Bouard',
      description: 'Développeuse web et mobile',
    };
  }
});

const detectActiveSection = () => {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const distanceFromTop = Math.abs(rect.top);

      if (distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop;
        closestSection = sectionId;
      }
    }
  });

  if (closestSection) {
    activeSection.value = closestSection;
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  hasScrolled.value = scrollY > 20;

  const section = document.getElementById('profile');
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  detectActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
