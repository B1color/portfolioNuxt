<template>
  <div>
    <AppNavbar />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
  detectActiveSection(); // Vérifie dès le début
});

onUnmounted(() => {
  window.removeEventListener('scroll', detectActiveSection);
});
</script>