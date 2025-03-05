<template>
  <section
    id="skills"
    :class="[
      'profile section pt-30 h-screen flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]">
    <div class="w-full">
      <!-- Contenu en deux colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <!-- Colonne gauche : Formation -->
        <div class="space-y-6">
          <div class="flex items-center space-x-4">

          <img src="/Icone study.png" alt="Icone Formation" class="bg-white p-2 rounded shadow">
          <h3 class="text-2xl font-semibold py-2 px-4 transition duration-300"
                :class="isDarkMode ? 'text-white' : 'text-gray-700'">
              Formation/
            </h3>          
          </div>
          <ul class="list-disc list-inside space-y-4">
            <li class="text-lg py-2 px-4 transition duration-300"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">
              Bachelor in Digital Media and Internet - IUT at Troyes
            </li>
            <li class="text-lg py-2 px-4 transition duration-300"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">
              Bac general | Lycée St-Louis
            </li>
          </ul>
        </div>

        <!-- Colonne droite : Skills -->
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
          <img src="/Icône Code.png" alt="Icone Skills" class="bg-white p-2 rounded shadow">
          <h3 class="text-2xl font-semibold py-2 px-4 transition duration-300" :class="isDarkMode ? 'text-white' : 'text-gray-700'">Skills/</h3>
          </div>
          <h4 class="text-lg py-2 px-4 transition duration-300" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">Technologies</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skills"
              :key="skill.id"
              class="border text-sm py-2 px-4 rounded-lg shadow-md cursor-pointer transition duration-300"
              :class="isDarkMode ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'"
              @click="showSkillDetails(skill)"
            >
            <div class="flex items-center space-x-4">
            <img
              :src="skill.icon"
              alt="Skill Icon"
              class="h-6 w-6"
            />
            {{ skill.title }}
          </div>
            </span>
          </div>
          <div
            v-if="isVisible"
            class="scrollDownIndicator fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
          >
          <p class="text-sm whitespace-nowrap uppercase mb-2 py-2 px-4 transition duration-300"
               :class="isDarkMode ? 'text-gray-400' : 'text-slate-700'">
              Skills
            </p>
            <div class="flex flex-col space-y-1">
              <div class="w-1 h-10 transition duration-300"
                   :class="isDarkMode ? 'bg-gray-400' : 'bg-slate-700'">
              </div>
            </div>
          </div>
          <div
            v-if="isPopupVisible"
            class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300"
            :class="isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-black'"
            >
            <div class="relative rounded-lg shadow-lg p-6 w-full max-w-5xl mx-4 lg:mx-auto overflow-y-auto transition duration-300"
                 :class="isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'">
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
              <!-- Contenu du pop-up -->
              <h3 class="text-2xl font-bold mb-4 py-2 px-4 transition duration-300"
                  :class="isDarkMode ? 'text-white' : 'text-slate-700'">
                {{ selectedSkill?.title }}
              </h3>
              <p class="transition duration-300"
                 :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                {{ selectedSkill?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import axios from "axios";
const isDarkMode = inject('isDarkMode'); // Récupérer le mode sombre globalement

const isVisible = ref(false);
const skills = ref([]); // Liste des skills
const selectedSkill = ref(null); // Skill sélectionné pour le pop-up
const isPopupVisible = ref(false); // Contrôle de la visibilité du pop-up

// Fonction pour récupérer les skills
const fetchSkills = async () => {
  try {
    const response = await axios.get("https://strapi.mlebouard.fr/api/skills?populate=*"); // Remplacez par votre URL
    skills.value = response.data.data.map((skill) => ({
      title: skill.Titre,
      description: skill.description || "Description not provided",
      icon: skill.icone?.url ? `https://strapi.mlebouard.fr${skill.icone.url}` : null,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des skills :", error);
  }
};

// Afficher le pop-up avec les détails d'un skill
const showSkillDetails = (skill) => {
  selectedSkill.value = skill;
  isPopupVisible.value = true;
};

// Cacher le pop-up
const closePopup = () => {
  isPopupVisible.value = false;
  selectedSkill.value = null;
};

// Gestion du scroll pour la section
const handleScroll = () => {
  const section = document.getElementById("skills");
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value =
      rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  }
};

onMounted(() => {
  fetchSkills(); // Récupérer les skills au montage
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
