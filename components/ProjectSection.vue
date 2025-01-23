<template>
    <swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :direction="direction"
      :navigation="true"
      :pagination="{ clickable: true }"
      :mousewheel="true"
      :keyboard="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        {{ slide }}
      </swiper-slide>
    </swiper>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
  
  // Slides content
  const slides = Array.from({ length: 9 }, (_, i) => `Slide ${i + 1}`);
  
  // Swiper modules
  const modules = [Navigation, Pagination, Mousewheel, Keyboard];
  
  // Reactive state for slides per view and direction
  const slidesPerView = ref(3);  // Default value
  const direction = ref('horizontal'); // Default value
  
  // Function to determine slides per view
  function getSlidesPerView() {
    return window.innerWidth <= 760 ? 1 : 3;
  }
  
  // Function to determine direction
  function getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }
  
  // Update values on window resize
  function handleResize() {
    slidesPerView.value = getSlidesPerView();
    direction.value = getDirection();
  }
  
  // Attach resize listener (client-side only)
  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();  // Set initial values
    }
  });
  
  // Cleanup listener on unmount
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });
  </script>
  
  <style scoped>
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
  
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>