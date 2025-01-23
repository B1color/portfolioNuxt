<template>
  <swiper
    v-if="projects.length > 0"
    :modules="modules"
    :slides-per-view="slidesPerView"
    :direction="direction"
    :navigation="true"
    :pagination="{ clickable: true }"
    :mousewheel="true"
    :keyboard="true"
    class="mySwiper"
  >
    <swiper-slide v-for="(project, index) in projects" :key="project.id">
      <NuxtLink :to="`/project/${project.id}`" class="project-card">
        <img
          v-if="project.thumbnailUrl"
          :src="project.thumbnailUrl"
          :alt="`Image de ${project.titre}`"
          class="project-image"
        />
        <h3 class="project-title">{{ project.titre }}</h3>
        <p class="project-description">{{ project.description || 'Pas de description disponible.' }}</p>
      </NuxtLink>
    </swiper-slide>
  </swiper>
  <p v-else>Chargement des projets...</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Liste des projets
const projects = ref([]);

// Modules Swiper
const modules = [Navigation, Pagination, Mousewheel, Keyboard];

// Configuration mobile-first par défaut
const slidesPerView = ref(1); // Mobile : 1 slide visible
const direction = ref('vertical'); // Mobile : défilement vertical

// Fonction pour ajuster les paramètres selon la taille de l'écran
function handleResize() {
  if (window.innerWidth <= 760) {
    slidesPerView.value = 1; // Mobile : 1 slide visible
    direction.value = 'vertical'; // Mobile : défilement vertical
  } else {
    slidesPerView.value = 3; // Desktop : 3 slides visibles
    direction.value = 'horizontal'; // Desktop : défilement horizontal
  }
}

// Récupération des projets depuis l'API Strapi
async function fetchProjects() {
  try {
    const response = await axios.get('https://strapi.mlebouard.fr/api/projets?populate=*');
    projects.value = response.data.data.map((project) => ({
      id: project.documentId,
      titre: project.Titre,
      description: project.description,
      thumbnailUrl: project.image_principal?.formats?.thumbnail?.url
        ? `https://strapi.mlebouard.fr${project.image_principal.formats.small.url}`
        : null,
    }));
    console.log('Projets récupérés avec thumbnails :', projects.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
  }
}

// Initialisation
onMounted(() => {
  handleResize(); // Définir les paramètres initiaux
  window.addEventListener('resize', handleResize); // Ajuster à chaque redimensionnement
  fetchProjects(); // Charger les projets
});

// Nettoyage au démontage
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
