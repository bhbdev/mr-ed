import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
	Layouts()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~fortawesome': resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free'),
      // '~primeflex': resolve(__dirname, 'node_modules/primeflex'),
      // '~primevue': resolve(__dirname, 'node_modules/primevue'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables";`
      }
    }
  }
})
