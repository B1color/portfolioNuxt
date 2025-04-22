<template>
  <footer 
    class="text-center py-4 transition-colors duration-300 border-t"
    :class="isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'"
  >
    <p class="text-sm transition duration-300"
       :class="isDarkMode ? 'text-gray-400' : 'text-sky-800'">
      Handcrafted by me © 2025<br>
    </p>
  </footer>
</template>
<script setup>
import { inject } from 'vue';

const isDarkMode = inject('isDarkMode');
</script>