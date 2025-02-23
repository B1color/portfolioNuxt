<template>
<nav
    :class="[
      'fixed top-0 left-0 w-full p-4 transition-colors duration-300',
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    ]"
  >
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <nuxt-link to="/">
        <img src="/logo.png" alt="Logo" class="h-25" />
      </nuxt-link>

      <!-- Menu desktop -->
      <ul class="hidden md:flex space-x-4 ml-auto">
        <li><a href="#profile" :class="['text-black py-2 px-4 ', isDarkMode ? 'hover:text-gray-500 text-gray-300 hover:text-gray-400' : ':hover:text-gray-500 text-black']">Profile</a></li>
        <li><a href="#skills" :class="['text-black py-2 px-4 ', isDarkMode ? 'hover:text-gray-500 text-gray-300 hover:text-gray-400' : ':hover:text-gray-500 text-black']">Skills</a></li>
        <li><a href="#projects" :class="['text-black py-2 px-4 ', isDarkMode ? 'hover:text-gray-500 text-gray-300 hover:text-gray-400' : ':hover:text-gray-500 text-black']">Projects</a></li>
        <li><a href="#contact" :class="['text-black py-2 px-4 ', isDarkMode ? 'hover:text-gray-500 text-gray-300 hover:text-gray-400' : ':hover:text-gray-500 text-black']">Contact</a></li>

        <!-- Bouton Dark Mode -->
        <button 
          @click="toggleDarkMode"
          class="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg transition duration-300 hover:bg-gray-700 
                 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-400"
        >
          {{ isDarkMode ? '🌞 Light' : '🌙 Dark' }}
        </button>
      </ul>
    </div>

    <!-- Menu mobile -->
    <div
      v-if="isMenuOpen"
      class="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 z-50"
    >
      <button
        class="absolute top-4 right-4 focus:outline-none"
        @click="toggleMenu"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <ul class="flex flex-col items-center space-y-4">
        <li><a href="#profile" :class="getLinkClass('profile')" class="text-slate-700 text-lg hover:text-gray-500" @click="toggleMenu">Profile</a></li>
        <li><a href="#skills" :class="getLinkClass('skills')" class="text-slate-700 text-lg hover:text-gray-500" @click="toggleMenu">Skills</a></li>
        <li><a href="#projects" :class="getLinkClass('projects')" class="text-slate-700 text-lg hover:text-gray-500" @click="toggleMenu">Projects</a></li>
        <li><a href="#contact" :class="getLinkClass('contact')" class="text-slate-700 text-lg hover:text-gray-500" @click="toggleMenu">Contact</a></li>
        <button 
        @click="toggleDarkMode"
        class="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold transition duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {{ isDarkMode ? '🌞 Light' : '🌙 Dark' }}
      </button>
      </ul>
    </div>
  </nav>
 <!-- Page Indicator -->
 <div class="pageIndicator fixed top-1/2 left-4 transform -translate-y-1/2 hidden md:flex flex-col items-start z-50">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="flex items-center cursor-pointer mb-4"
        @click="scrollToSection(section.id)"
      >
        <div
        :class="[
          'transition-all duration-300',
          activeSection === section.id
            ? 'bg-sky-800'
            : isDarkMode ? 'bg-gray-600 opacity-50' : 'bg-gray-300 opacity-50'
        ]"
        :style="{ width: section.width, height: '4px' }"
      ></div>
      </div>
    </div>

   <!-- Social Media Indicator -->
   <div class="fixed top-1/2 right-4 transform -translate-y-1/2 hidden md:flex flex-col items-start space-y-6 z-50">
    <!-- Rond indicateur animé -->
    <div
      class="absolute w-2 h-2 bg-sky-800 border-radius: 9999px transition-all duration-400"
      :style="{ top: `${activeIndex * 30}px`, left: '-20px' }"
    ></div>

    <!-- Liste des items -->
    <div
      v-for="(link, index) in socialLinks"
      :key="index"
      class="relative flex items-center cursor-pointer group"
      @mouseover="setActive(index)"
      @click="openLink(link.url)"
    >
      <span class="text-gray-500 group-hover:text-sky-800 transition-colors duration-300">
        {{ link.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject} from 'vue';
const isDarkMode = inject('isDarkMode');
const toggleDarkMode = inject('toggleDarkMode');


const isMenuOpen = ref(false);
const activeSection = ref('profile');
const activeIndex = ref(0);


const sections = [
  { id: 'profile', width: '30px' },
  { id: 'skills', width: '60px' },
  { id: 'projects', width: '80px' },
  { id: 'contact', width: '40px' }
];

// Liste des réseaux sociaux
const socialLinks = ref([
  { label: 'Git', url: 'https://www.linkedin.com/in/manon-le-bouard/' },
  { label: 'In', url: 'https://www.linkedin.com/in/manon-le-bouard/' },
  { label: 'Mail', url: 'mailto:manon.le-bouard@etudiant.univ-reims.fr' }
]);

const setActive = (index) => {
  activeIndex.value = index;
};

const openLink = (url) => {
  window.open(url, '_blank');
};


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const getLinkClass = (sectionId) => {
  return activeSection.value === sectionId
    ? 'underline decoration-4 decoration-cyan-800 decoration-offset-4'
    : '';
};

const detectActiveSection = () => {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((section) => {
    const sectionElement = document.getElementById(section.id);
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      const distanceFromTop = Math.abs(rect.top);

      if (distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop;
        closestSection = section.id;
      }
    }
  });

  if (closestSection) {
    activeSection.value = closestSection;
  }
};

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    const yOffset = -70; // Ajustez cette valeur selon la hauteur de votre navbar
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};


const handleClick = (item) => {
  activeItem.value = item.label; // Met à jour l'item actif
  console.log(`Navigating to: ${item.label}`);
};


onMounted(() => {
  window.addEventListener('scroll', detectActiveSection);
  detectActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', detectActiveSection);
});

</script>

<style scoped>
.pageIndicator > div {
  margin-bottom: 1rem; /* Équivalent à `space-y-4` */
}
.pageIndicator > div:last-child {
  margin-bottom: 0; /* Supprime l'espace après le dernier élément */
}

</style>