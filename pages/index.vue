<template>
  <div>
    <ProfileSection id="profile" />
    <SkillSection id="skills" />
    <ProjectSection id="projects" />
    <ContactSection id="contact" />
  </div>
</template>

<style>
/* Défilement smooth uniquement en desktop */
@media (min-width: 768px) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
<script>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  const sections = Array.from(document.querySelectorAll("section"));
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY + window.innerHeight / 2;

        // Trouver la section la plus proche du milieu
        const closestSection = sections.reduce((prev, curr) => {
          const currOffset = Math.abs(curr.offsetTop - currentScroll);
          const prevOffset = Math.abs(prev.offsetTop - currentScroll);
          return currOffset < prevOffset ? curr : prev;
        });

        // Défilement fluide vers cette section
        if (closestSection) {
          closestSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  // Écouter le défilement
  window.addEventListener("scroll", handleScroll);

  // Nettoyer à la désactivation du composant
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>