<template>
  <section class="contact section fp-tableCell relative flex items-center w-full max-w-screen-lg mx-auto px-4 md:px-8 min-h-screen bg-white-100">
    <div class="space-y-4">
      <!-- Titre -->
      <h2 class="text-3xl md:text-4xl font-bold text-slate-700">Contact</h2>

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
            manon.le-bouard@etudiant.univ-reims.fr
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
  </section>
</template>

<script setup>
import { ref } from "vue";

const copyEmail = () => {
  const email = "manon.le-bouard@etudiant.univ-reims.fr";
  navigator.clipboard
    .writeText(email)
    .then(() => alert("Email copied to clipboard!"))
    .catch((err) => console.error("Failed to copy email: ", err));
};
</script>
