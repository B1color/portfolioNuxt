<template>
  <nav class="p-4 bg-white-800 text-dark sticky-top">
    <div class="flex justify-between items-center">

      <img src="/favicon.png" alt="Logo" class="h-8" />

      <button 
        class="md:hidden focus:outline-none" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Menu desktop -->
      <ul class="hidden md:flex space-x-4 ml-auto">
        <li><a href="#profile" class="py-2 px-4 hover:text-gray-300">Profil</a></li>
        <li><a href="#skills" class="py-2 px-4 hover:text-gray-300">Compétences</a></li>
        <li><a href="#projects" class="py-2 px-4 hover:text-gray-300">Projets</a></li>
        <li><a href="#contact" class="py-2 px-4 hover:text-gray-300">Contact</a></li>
      </ul>
    </div>

    <!-- Menu mobile -->
    <ul
      v-if="isMenuOpen"
      class="md:hidden flex flex-col space-y-2 mt-4 bg-white-700 p-4"
    >
      <li><a href="#profile" class="block py-2 px-4 hover:text-gray-300">Profil</a></li>
      <li><a href="#skills" class="block py-2 px-4 hover:text-gray-300">Compétences</a></li>
      <li><a href="#projects" class="block py-2 px-4 hover:text-gray-300">Projets</a></li>
      <li><a href="#contact" class="block py-2 px-4 hover:text-gray-300">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
