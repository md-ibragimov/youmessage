export default defineNuxtConfig({
  components: {
    dirs: [
      '~/components',
    ]
  },
  css: [
    '~/normalize.css',
  ],
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  runtimeConfig: {
    public: {
      DATABASE_URL: process.env.DATABASE_URL
    }
  }
})
