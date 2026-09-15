import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const sourceDirectory = fileURLToPath(new URL('./src/', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': sourceDirectory,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
