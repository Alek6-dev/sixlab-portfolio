import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const sourceDirectory = fileURLToPath(new URL('./src/', import.meta.url))
const serverOnlyStub = fileURLToPath(
  new URL('./vitest.server-only.ts', import.meta.url)
)

export default defineConfig({
  resolve: {
    alias: {
      '@': sourceDirectory,
      'server-only': serverOnlyStub,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
