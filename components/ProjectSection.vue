<template>
<section id="projects" class="project section m-8 fp-tableCell relative min-h-screen flex items-center justify-center w-full max-w-screen-lg mx-auto px-4 md:px-8 bg-white-100">
  <div class="space-y-8">
      <!-- Titre de la section -->
      <div class="flex items-center space-x-4">
        <img src="/Icône Dossier 32.png" alt="">
        <h2 class="text-2xl font-bold text-slate-700 py-2 px-4 ">
          Projects/
        </h2>
      </div>

      <!-- Grille des projets -->
      <div v-if="projects.length > 0" class="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card relative border border-slate-300 overflow-hidden transition-all duration-300 group bg-bg-primary cursor-pointer h-full flex flex-col"
          @click="openPopup(project)"
        >
          <img
            v-if="project.thumbnailUrl"
            :src="project.thumbnailUrl"
            :alt="`Image de ${project.titre}`"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">{{ project.titre }}</h3>
            <p class="text-gray-700 text-sm">
              {{ project.description || 'Pas de description disponible.' }}
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-500">Chargement des projets...</p>
    </div>
    <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
        <p class="text-slate-700 text-sm whitespace-nowrap uppercase mb-2">
          Projects
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 bg-slate-700"></div>
        </div>
      </div>
    <!-- Popup -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto"
    >
      <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-4 lg:mx-auto overflow-y-auto">
        <!-- Bouton Fermer -->
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          @click="closePopup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Contenu du pop-up -->
        <h3 v-if="selectedProject" class="text-xl font-bold mb-4">
          Projects/ {{ selectedProject?.titre }}
        </h3>
        <img
          v-if="selectedProject?.mediumUrl"
          :src="selectedProject.mediumUrl"
          :alt="`Image de ${selectedProject?.titre}`"
          class=" object-contain mx-auto mb-4"
          />
        <p v-if="selectedProject?.description" class="text-gray-700">
          {{ selectedProject?.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const projects = ref([]);
const isPopupVisible = ref(false);
const selectedProject = ref(null);
const isVisible = ref(false);

const handleScroll = () => {
  const section = document.getElementById('projects');
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


const openPopup = (project) => {
  selectedProject.value = project;
  isPopupVisible.value = true;
};

// Fermer la popup
const closePopup = () => {
  isPopupVisible.value = false;
};

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
      mediumUrl: project.image_principal?.formats?.medium?.url
        ? `https://strapi.mlebouard.fr${project.image_principal.formats.medium.url}`
        : null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
  }
}

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
.project-card:hover {
  transform: scale(1.03);
}

.project-card img {
  transition: transform 0.3s ease-in-out;
}

.project-card:hover img {
  transform: scale(1.05);
}
</style>
