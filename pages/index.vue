<template>
    <div>
      <ProfileSection id="profile" />
      <SkillSection id="skills" />
      <ProjectSection id="projects" />
      <ContactSection id="contact" />  
    </div>
  </template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Liste des sections
const sections = ["profile", "skills", "projects", "contact"];
const activeSection = ref("profile");

// Détection de la section visible
const detectActiveSection = () => {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const distanceFromCenter = Math.abs(rect.top + rect.height / 4 - window.innerHeight / 3);

      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestSection = sectionId;
      }
    }
  });

  if (closestSection && activeSection.value !== closestSection) {
    activeSection.value = closestSection;

    // Faites défiler en douceur vers la section active
    const sectionElement = document.getElementById(closestSection);
    sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// Écoutez le défilement
onMounted(() => {
  window.addEventListener("scroll", detectActiveSection);
  detectActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", detectActiveSection);
});
</script>

