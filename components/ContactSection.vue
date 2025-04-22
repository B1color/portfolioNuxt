<template>
  <section 
  :class="[
      'contact section pt-30 h-screen flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]"
    >
    <div class="space-y-4">
      <!-- Titre -->
      <div class="flex items-center space-x-4">
        <img src="/Icône Nouveau Message.png" alt="Icon" class="w-8 h-8">
        <h2 class="text-2xl md:text-4xl font-bold py-2 px-4 transition duration-300":class="isDarkMode ? 'text-white' : 'text-slate-700'">Contact/</h2>
      </div>
      
      <!-- Paragraphe -->
      <p class="mt-4 text-left text-lg md:text-base font-light leading-relaxed transition duration-300" :class="isDarkMode ? 'text-gray-300' : 'text-slate-700'">
        I'm always happy to connect!<br>
        Whether you want to collaborate, have a question, feel free to reach out.
      </p>

      <!-- Conteneur de contact -->
      <div class="contact-top mt-6 transition duration-300" :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-sky-800'">
        <div         
        class="mail-container grid grid-cols-[1fr_auto] gap-2 items-center border rounded-md p-2"
          :class="isDarkMode ? 'border-gray-600 text-white' : 'border-sky-800 text-black'"
      >
          <!-- Adresse e-mail -->
          <span class="mail text-lg md:text-base font-semibold truncate select-all transition duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-700'">
            {{ profile?.email || "Loading..." }}
          </span>
          <!-- Bouton Copier -->
          <button
          class="mail-copy px-2 py-2 aspect-square text-lg font-light flex items-center justify-center rounded-md transition duration-300 ease-in-out"
            :class="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-sky-800 text-white hover:bg-white hover:text-slate-700 hover:border'"
            type="button"
            @click="copyEmail"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
    <div
        v-if="isVisible"
        class="scrollDownIndicator fixed bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 z-50 transition-opacity duration-300"
      >
        <p class="text-sm whitespace-nowrap uppercase mb-2 transition duration-300"
        :class="isDarkMode ? 'text-gray-400' : 'text-slate-700'"
    >
          Contact
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 transition duration-300"
          :class="isDarkMode ? 'bg-gray-400' : 'bg-slate-700'"></div>
        </div>
      </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import axios from "axios";

const isDarkMode = inject('isDarkMode');
const isVisible = ref(false);
const profile = ref({ email: "Loading..." });

async function fetchContact() {
  try {
    const response = await axios.get("https://strapi.mlebouard.fr/api/contacts");
    const data = response.data.data[0];
    profile.value = {
      email: data.Titre,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données de profil:", error);
  }
}

const copyEmail = () => {
  if (profile.value.email) {
    navigator.clipboard
      .writeText(profile.value.email)
      .then(() => alert("Email copied to clipboard!"))
      .catch((err) => console.error("Failed to copy email: ", err));
  }
};

const handleScroll = () => {
  const section = document.getElementById('contact');
  if (section) {
    const rect = section.getBoundingClientRect();
    isVisible.value = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  }
};

onMounted(() => {
  fetchContact();
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
