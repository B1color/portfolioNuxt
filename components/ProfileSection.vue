<template>
  <section id="contact" class="contact section h-screen flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 bg-white">
    <div class="flex flex-col md:flex-row items-center justify-center w-full h-full space-y-8 md:space-y-0 md:space-x-16">
      <!-- Colonne gauche -->
      <div class="md:w-1/2 flex flex-col justify-center items-start text-left">
        <h1 class="text-3xl font-semibold mb-4 text-slate-700">
          Hello,<br> my name is Manon
        </h1>

        <p class="text-lg text-gray-600 mb-6 leading-loose font-light bg-white">
          {{ profile?.description || 'Chargement de la description...' }}
        </p>

        <a href="/CV MAJ 2025 ENG.pdf" class="text-base text-slate-700 font-bold underline self-start">
          Get My Resume
        </a>
      </div>

      <div class="relative md:w-1/2 flex justify-center items-center">
        <img :src="profileImage" alt="Manon Le Bouard" class="w-64 h-64 object-cover rounded-full shadow-lg" />
      </div>

      <!-- Indicateur de scroll -->
      <div
        class="scrollDownIndicator fixed bottom-4 left-4 flex hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
        :class="{ 'opacity-0': hasScrolled, 'opacity-100': !hasScrolled }"
      >
        <p class="text-slate-700 text-sm rotate-90 whitespace-nowrap mb-20 uppercase">
          Scroll Down
        </p>
        
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-35 bg-slate-700"></div>
        </div>
      </div>
      <!-- Indicateur de type -->
      <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
        <p class="text-slate-700 text-sm whitespace-nowrap uppercase mb-2">
          Profile
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 bg-slate-700"></div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

// Définir la variable profile pour stocker les données
const profile = ref(null);
const sections = ['profile', 'skills', 'projects', 'contact'];
const activeSection = ref('profile');
const isVisible = ref(false);
const hasScrolled = ref(false);
const profileImage = ref('/pnj-portfolio.png')

// Fonction pour récupérer les données de l'API
async function fetchProfile() {
  try {
    const response = await axios.get('https://strapi.mlebouard.fr/api/profils/');
    const data = response.data.data[0]; // Récupérer le premier profil
    profile.value = {
      Titre: data.Titre,
      description: data.description,
      image: data.documentId ? `/images/${data.documentId}.jpg` : null // Assurez-vous que vous avez l'image ou remplacez par une URL correcte
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données de profil:', error);
  }
}

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
  hasScrolled.value = window.scrollY > 0;
  const section = document.getElementById('profile');
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value = rect.top >= 0 && rect.bottom <= window.innerHeight;
  }
};

onMounted(() => {
  fetchProfile();
});

onMounted(() => {
  window.addEventListener('scroll', detectActiveSection);
  detectActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', detectActiveSection);
});
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
