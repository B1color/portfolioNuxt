<template>
  <div>
    <AppNavbar />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue';

const sections = ['profile', 'skills', 'projects', 'contact'];
const activeSection = ref('profile');

const detectActiveSection = () => {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const distanceFromTop = Math.abs(rect.top);

      if (distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop;
        closestSection = sectionId;
      }
    }
  });

  if (closestSection) {
    activeSection.value = closestSection;
  }
};

onMounted(() => {
  window.addEventListener('scroll', detectActiveSection);
  detectActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', detectActiveSection);
});

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;

  document.documentElement.classList.toggle('dark', isDarkMode.value); // ✅ Utilisation de `toggle`

  if (isDarkMode.value) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }

  console.log("Mode sombre:", isDarkMode.value ? "Activé" : "Désactivé"); // ✅ Vérification console
};

// Vérifie l'état du mode sombre au démarrage
onMounted(() => {
  const storedDarkMode = localStorage.getItem('darkMode');

  isDarkMode.value = storedDarkMode === 'enabled'; // ✅ Simplification
  document.documentElement.classList.toggle('dark', isDarkMode.value);
});

// Fournir `isDarkMode` et `toggleDarkMode` à tous les composants enfants
provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', toggleDarkMode);
</script>
