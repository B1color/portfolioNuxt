<template>
  <section class="contact  section fp-tableCell relative flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 min-h-screen bg-white-100">
    <div class="space-y-8">
      <!-- Titre de la section -->
      <div class="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          width="32px"
          height="32px"
          class="text-gray-500"
        >
          <path fill="#D8D4EA" d="M100.2,104H19c-5.5,0-10-4.5-10-10V29h98.7c6,0,10.7,5.3,9.9,11.2l-7.5,55C109.5,100.2,105.2,104,100.2,104 z" />
        </svg>
        <h2 class="text-2xl font-regular text-gray-700 py-2 px-4 border border-slate-300 rounded-full">
          Contact Me
        </h2>
      </div>

      <!-- Informations de contact -->
      <div class="contact-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <!-- Email -->
        <div class="contact-card border border-slate-300 rounded-lg p-4 shadow-md transition-all duration-300">
          <h3 class="text-lg font-bold mb-2">Email</h3>
          <p class="text-gray-700 text-sm mb-4">manon@example.com</p>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            @click="copyToClipboard('manon@example.com')"
          >
            Copy Email
          </button>
        </div>

        <!-- Téléphone -->
        <div class="contact-card border border-slate-300 rounded-lg p-4 shadow-md transition-all duration-300">
          <h3 class="text-lg font-bold mb-2">Phone</h3>
          <p class="text-gray-700 text-sm mb-4">+33 6 12 34 56 78</p>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            @click="copyToClipboard('+33612345678')"
          >
            Copy Phone Number
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      alert('Copied to clipboard: ' + text);
    },
    (err) => {
      console.error('Failed to copy text: ', err);
    }
  );
}
</script>

<style scoped>
/* Effet de survol pour les cartes de contact */
.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.contact-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
</style>
