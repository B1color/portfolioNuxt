<template>
  <section
    id="projects"
    :class="[
      'profile section pt-30 h-screen flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]">
    <div class="space-y-8">
      <!-- Titre de la section -->
      <div class="flex items-center space-x-4">
        <img src="/Icône Dossier 32.png" alt="Icone dossier" class="bg-white p-2 rounded shadow">
        <h2 class="text-2xl font-bold py-2 px-4 transition duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-700'">
          Projects/</h2>
      </div>

      <!-- Grille projets -->
      <div v-if="projects.length > 0" class="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-6">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card relative border overflow-hidden transition-all duration-300 group cursor-pointer h-full flex flex-col"
          :class="isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-slate-300 bg-white hover:bg-gray-100'"
          @click="openPopup(project)"
        >
          <img
            v-if="project.thumbnailUrl"
            :src="project.thumbnailUrl"
            :alt="`Image de ${project.titre}`"
            class="w-full  object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2 transition duration-300"
                :class="isDarkMode ? 'text-white' : 'text-slate-700'">
                {{ project.titre }}
            </h3>
            <p class="text-sm transition duration-300"
               :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ project.information || 'Pas de description disponible.' }}
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-center transition duration-300"
         :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          Chargement des projets...
      </p>
    </div>
    <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
        <p class="text-sm whitespace-nowrap uppercase mb-2 transition duration-300"
          :class="isDarkMode ? 'text-gray-400' : 'text-slate-700'">
          Projects
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 transition duration-300"
             :class="isDarkMode ? 'bg-gray-400' : 'bg-slate-700'">
        </div>
        </div>
    </div>
    <!-- Pop up -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300"
      :class="isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-black'"
    >
    <div
      class="popup-container relative border rounded-lg shadow-lg w-full max-w-5xl mx-4 lg:mx-auto overflow-hidden transition-all duration-300"
      :class="isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'"
      >
        <!-- Bouton Fermer -->
        <button
        class="absolute top-4 right-4 transition duration-300"
        :class="isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-800'"
        @click="closePopup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="popup-header sticky top-0 z-10 p-4 transition duration-300"
              :class="isDarkMode ? 'bg-gray-700 text-white border-b border-gray-600' : 'bg-white text-slate-700 border-b border-gray-300'">
            <h2 v-if="selectedProject?.titre" class="text-2xl font-bold mb-4">
            {{ selectedProject.titre }}
          </h2>
        </div>

        <!-- Contenu scrollable -->
        <div class="popup-content p-6 overflow-y-auto">
          <img
            v-if="selectedProject?.mediumUrl"
            :src="selectedProject.mediumUrl"
            :alt="`Image de ${selectedProject?.titre}`"
            class="w-full h-130 object-contain mb-4"
          />

          <!-- Présentation -->
          <section v-if="selectedProject?.Presentation" class="mb-6">
            <h3 class="text-lg font-bold mb-2 transition duration-300"
            :class="isDarkMode ? 'text-white' : 'text-gray-700'">
              Presentation
            </h3>
            <p class="transition duration-300"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ selectedProject.Presentation }}
            </p>
          </section>
          <hr v-if="selectedProject?.Presentation" class="mb-4 transition duration-300"
          :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'" />

          <!-- Fonctionnalités -->
          <section v-if="selectedProject?.fonctionnalite" class="mb-6">
            <h3 class="text-lg font-bold mb-2 transition duration-300"
            :class="isDarkMode ? 'text-white' : 'text-gray-700'">
              {{ selectedProject.fonctionnaliteTitre || 'Fonctionnalités' }}
            </h3>
            <p class="whitespace-pre-line transition duration-300"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ selectedProject.fonctionnalite }}
            </p>          
          </section>
            <hr v-if="selectedProject?.fonctionnalite" class="mb-4 transition duration-300"
          :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'" />

          <!-- Contexte -->
          <section v-if="selectedProject?.contexte" class="mb-6">
            <h3 class="text-lg font-bold mb-2 transition duration-300"
                :class="isDarkMode ? 'text-white' : 'text-gray-700'">
              {{ selectedProject.titreContext || 'Contexte' }}
            </h3>
            <p class="whitespace-pre-line transition duration-300"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ selectedProject.contexte }}
            </p>
          </section>
          <hr v-if="selectedProject?.contexte" class="mb-4 transition duration-300"
          :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'" />

          <!-- État final -->
          <section v-if="selectedProject?.final" class="mb-6">
            <h3 class="text-lg font-bold mb-2 transition duration-300"
                :class="isDarkMode ? 'text-white' : 'text-gray-700'">
              {{ selectedProject.titreFinal || 'État actuel' }}
            </h3>
            <p class="transition duration-300"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ selectedProject.final }}
            </p>
          </section>
          <hr v-if="selectedProject?.final" class="mb-4 transition duration-300"
          :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'" />

          <!-- Boutons d'action -->
          <div class="flex space-x-4 mt-4">
            <a
              v-if="selectedProject?.site_url"
              :href="selectedProject.site_url"
              target="_blank"
              class="border px-4 py-2 flex items-center space-x-2 transition duration-300"
              :class="isDarkMode ? 'border-gray-700 text-white hover:bg-gray-700' : 'border-gray-300 text-dark hover:bg-gray-300 hover:text-white'"
            >
              <img src="/Icone Globe.png" alt="">
              <span>Visiter le site</span>
            </a>
            <a
              v-if="selectedProject?.github_link"
              :href="selectedProject.github_link"
              target="_blank"
              class="border px-4 py-2 flex items-center space-x-2 transition duration-300"
              :class="isDarkMode ? 'border-gray-700 text-white hover:bg-gray-700' : 'border-gray-300 text-dark hover:bg-gray-300 hover:text-white'"
            >
            <img src="/Icône Github 16.png" alt="">
            <span>Voir sur GitHub</span>
            </a>
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
const isPopupVisible = ref(false);
const selectedProject = ref(null);
const isVisible = ref(false);

const { data: projects } = useAsyncData('projects', async () => {
  try {
    const response = await axios.get('https://strapi.mlebouard.fr/api/projets?populate=*');
    return response.data.data.map((project) => ({
      id: project.id,
      titre: project.Titre,
      description: project.description,
      information: project.information,
      contexte: project.contexte,
      fonctionnalite: project.fonctionnalite,
      fonctionnaliteTitre: project.fonctionnaliteTitre,
      titreContext: project.titreContext,
      final: project.final,
      titreFinal: project.titreFinal,
      site_url: project.site_url,
      github_link: project.github_link,
      Presentation: project.Presentation,
      thumbnailUrl: project.image_principal?.formats?.thumbnail?.url
        ? `https://strapi.mlebouard.fr${project.image_principal.formats.medium.url}`
        : null,
      mediumUrl: project.image_principal?.formats?.medium?.url
        ? `https://strapi.mlebouard.fr${project.image_principal.formats.large.url}`
        : null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
    return [];
  }
});

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

// Gestion de la popup
const openPopup = (project) => {
  selectedProject.value = project;
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
};
</script>

<style scoped>
.popup-container {
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.popup-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.popup-content {
  max-height: calc(90vh - 50px);
  overflow-y: auto;
}

button {
  z-index: 20;
}


</style>
