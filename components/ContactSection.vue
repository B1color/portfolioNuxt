<template>
  <section class="contact section fp-tableCell relative flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 min-h-screen bg-white-100">
    <div class="space-y-4">
      <!-- Titre -->
      <div class="flex items-center space-x-4">
        <img src="/Icône Nouveau Message.png" alt="Icon" class="w-8 h-8">
        <h2 class="text-2xl md:text-4xl font-bold text-slate-700">Contact/</h2>
      </div>
      
      <!-- Paragraphe -->
      <p class="mt-4 text-left text-slate-700 text-lg md:text-base font-light leading-relaxed">
        I'm always happy to connect!<br>
        Whether you want to collaborate, have a question, feel free to reach out.
      </p>

      <!-- Conteneur de contact -->
      <div class="contact-top mt-6">
        <div class="mail-container grid grid-cols-[1fr_auto] gap-2 items-center border border-sky-800 rounded-md p-2 bg-transparent">
          <!-- Adresse e-mail -->
          <span class="mail text-slate-700 text-lg md:text-base font-semibold truncate select-all">
            {{ profile?.email || "Loading..." }}
          </span>
          <!-- Bouton Copier -->
          <button
            class="mail-copy px-2 py-2 text-white aspect-square bg-sky-800 text-lg font-light flex items-center justify-center rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-slate-700 hover:border"
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
        <p class="text-slate-700 text-sm whitespace-nowrap uppercase mb-2">
          Contact
        </p>
        <div class="flex flex-col space-y-1">
          <div class="w-1 h-10 bg-slate-700"></div>
        </div>
      </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const profile = ref({});
const isVisible = ref(false);

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

async function fetchProfile() {
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

onMounted(() => {
  fetchProfile();
});


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
