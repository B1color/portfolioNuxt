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