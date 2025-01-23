<template>
  <section class="h-screen p-8 bg-white-100">
    <div class="flex flex-col md:flex-row items-center justify-center h-full">
      <!-- Colonne gauche -->
      <div class="md:w-1/2 flex flex-col justify-center items-center text-center md:text-left">
        <h1 class="text-3xl md:text-4xl font-semibold mb-4">{{ profile?.Titre || 'Chargement...' }}</h1>
        <p class="text-gray-700 mb-4 leading-relaxed text-lg md:text-xl">
          {{ profile?.description || 'Chargement de la description...' }}
        </p>
        <a href="#" class="bg-500 text-dark px-6 py-2">
          Get My Resumé
        </a>
      </div>

      <!-- Colonne droite -->
      <div class="relative md:w-1/2 mt-4 md:mt-0 flex justify-center items-center">
        <div class="Shade"></div>

        <div class="bg-gray-300 w-48 h-48 flex items-center justify-center relative z-10">
          <img v-if="profile?.image" :src="profile.image" alt="Manon" class="h-40 w-40  object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Définir la variable profile pour stocker les données
const profile = ref(null);

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

// Récupérer les données au montage du composant
onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.Shade {
  background-color: #E8E6E6;
  position: absolute;
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  z-index: 0;
}

.bg-gray-300 {
  background-color: #D1D5DB;
}

/* Centrer le contenu en hauteur et en largeur */
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* Media query pour les grands écrans */
@media (min-width: 768px) {
  .Shade {
    width: 20vw;
    height: 20vw;
    top: 25%;
    left: 25%;
  }
}
</style>
