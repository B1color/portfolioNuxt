<template>
  <section id="projects" class="project section fp-tableCell relative flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 min-h-screen bg-white-100">
    <div class="space-y-8">
      <!-- Titre de la section -->
      <div class="flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 128 128">
        <path fill="#D8D4EA" d="M100.2,104H19c-5.5,0-10-4.5-10-10V29h98.7c6,0,10.7,5.3,9.9,11.2l-7.5,55C109.5,100.2,105.2,104,100.2,104 z"></path><path fill="#FFF" d="M104,104H19c-5.5,0-10-4.5-10-10V24h24.6c3.3,0,6.5,1.7,8.3,4.5l4.1,6.1c1.9,2.8,5,4.5,8.3,4.5H89 c5.5,0,10,4.5,10,10v41v1.9C99,96.5,100.8,100.8,104,104L104,104z"></path><path fill="#454B54" d="M100.2,107H19c-7.2,0-13-5.8-13-13V24c0-1.7,1.3-3,3-3h24.6c4.4,0,8.4,2.2,10.8,5.8l4.1,6.1 c1.3,2,3.5,3.1,5.8,3.1H89c7.2,0,13,5.8,13,13v35c0,1.7-1.3,3-3,3s-3-1.3-3-3V49c0-3.9-3.1-7-7-7H54.4c-4.4,0-8.4-2.2-10.8-5.8 l-4.1-6.1c-1.3-2-3.5-3.1-5.8-3.1H12v67c0,3.9,3.1,7,7,7h81.2c3.5,0,6.5-2.6,6.9-6.1l7.5-55c0.2-2-0.4-4-1.7-5.5 c-1.3-1.5-3.2-2.4-5.2-2.4c-1.7,0-3-1.3-3-3s1.3-3,3-3c3.7,0,7.3,1.6,9.7,4.4c2.5,2.8,3.6,6.5,3.2,10.2l-7.5,55 C112.3,102.1,106.7,107,100.2,107z"></path><path fill="#454B54" d="M107.7,32H43c-1.7,0-3-1.3-3-3s1.3-3,3-3h64.7c1.7,0,3,1.3,3,3S109.3,32,107.7,32z"></path>
        </svg>
        <h2 class="text-xl font-regular text-gray-700 py-2 px-4 ">
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

    <!-- Popup -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative">
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          @click="closePopup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-xl font-bold mb-4">Projects/ {{ selectedProject?.titre }}</h3>
        <img
          v-if="selectedProject?.thumbnailUrl"
          :src="selectedProject.thumbnailUrl"
          :alt="`Image de ${selectedProject?.titre}`"
          class="w-full h-48 object-cover mb-4 rounded"
        />
        <p class="text-gray-700">{{ selectedProject?.description }}</p>
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
