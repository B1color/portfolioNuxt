import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      title: 'Portfolio Manon Le Bouard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Portfolio de Manon Le Bouard, développeuse full stack' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/logo.png',
        },
      ],
    },
  },

  modules: [],
})
