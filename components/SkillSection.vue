<template>
    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">My Skills</h2>
        <p class="section-description">
          Here are some of the technical and soft skills I have acquired over time as a developer.
        </p>
        <div class="skills-grid">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="skill-card"
          >
            <div class="icon-wrapper">
              <img :src="skill.icon" :alt="`${skill.name} icon`" />
            </div>
            <h3 class="skill-title">{{ skill.name }}</h3>
            <p class="skill-description">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Liste des compétences (techniques ou autres)
  const skills = ref([
    {
      name: 'HTML & CSS',
      description: 'Proficient in creating responsive and accessible web designs.',
      icon: '/icons/html-css.svg', // Chemin vers une icône correspondante
    },
    {
      name: 'JavaScript',
      description: 'Experience in writing modern JavaScript using ES6+ features.',
      icon: '/icons/javascript.svg',
    },
    {
      name: 'Vue.js',
      description: 'Building scalable and dynamic SPAs using Vue 3.',
      icon: '/icons/vuejs.svg',
    },
    {
      name: 'Node.js',
      description: 'Developing RESTful APIs and backend services.',
      icon: '/icons/nodejs.svg',
    },
    {
      name: 'Git & GitHub',
      description: 'Version control and collaboration with Git and GitHub.',
      icon: '/icons/git.svg',
    },
    {
      name: 'Problem Solving',
      description: 'Strong analytical skills to solve complex problems.',
      icon: '/icons/problem-solving.svg',
    },
  ]);
  </script>
  
  <style scoped>
  .skills-section {
    padding: 4rem 2rem;
    background-color: #f9fafb;
    text-align: center;
  }
  
  .container {
    max-width: 1200px;
    margin: auto;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .section-description {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 2rem;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .skill-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  .icon-wrapper {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
  }
  
  .icon-wrapper img {
    max-width: 100%;
    height: auto;
  }
  
  .skill-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin: 0.5rem 0;
  }
  
  .skill-description {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
  }
  </style>
  