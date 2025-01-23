<template>
  <section class="p-8 bg-white-100">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2">
        <h1>Hello, my name is Manon</h1>
        <p>
          I’m currently a full-stack developer at SICESI in apprenticeship. My areas of interest are problem-solving, cloud infrastructure, machine learning, and cybersecurity. I enjoy creating new apps, websites, or plugins with (...)
        </p>
        <a href="#">Get My resumé</a>
      </div>

      <div class="relative md:w-1/2 mt-4 md:mt-0">
        <div class="Shade"></div>

        <div class="bg-gray-300 w-48 h-48 flex items-center justify-center relative z-10">
          <img src="/pnj-portfolio.png" alt="Manon" class="h-40 w-40" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.Shade {
  background-color: #E8E6E6; 
  position: absolute;
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  z-index: 0;
}

@media (min-width: 768px) {
  .Shade {
    width: 20vw;
    height: 20vw; 
    top: 25%;
    left: 25%;
  }
}

@media (max-width: 768px) {
  .Shade {
    width: 50%;
    height: 50%;
    top: 20%;
    left: 20%;
  }
}

.bg-gray-300 {
  background-color: #D1D5DB;
}
</style>
