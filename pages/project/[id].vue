<template>
    <div>
      <h1>{{ project?.titre }}</h1>
      <img :src="project?.thumbnailUrl" :alt="`Image de ${project?.titre}`" v-if="project?.thumbnailUrl" />
      <p>{{ project?.description }}</p>
      <NuxtLink to="/">Retour à l'accueil</NuxtLink>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const project = ref(null);
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        `https://strapi.mlebouard.fr/api/projets?filters[documentId][$eq]=${route.params.id}&populate=*`
      );
  
      // Vérifie si un projet a été trouvé
      if (response.data.data.length > 0) {
        const projectData = response.data.data[0];
        project.value = {
          id: projectData.id,
          titre: projectData.Titre,
          description: projectData.description,
          thumbnailUrl: projectData.image_principal?.formats?.small?.url
            ? `https://strapi.mlebouard.fr${projectData.image_principal.formats.small.url}`
            : null,
        };
      } else {
        console.error('Aucun projet trouvé avec ce documentId.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du projet :', error);
    }
  });
  </script>
  