import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — avoids legacy syntax transforms, smaller output
    target: 'es2020',
    // Inline small non-font assets as base64 (fewer HTTP requests for small SVGs/images).
    // Fonts are explicitly excluded — they must stay as separate files for browser caching.
    assetsInlineLimit(filePath, content) {
      if (/\.(woff2?|ttf|eot)(\?.*)?$/.test(filePath)) return false
      return content.length < 8192
    },
    rollupOptions: {
      output: {
        // Split stable vendor code into separate chunks so browsers can cache them
        // independently of app code changes
        manualChunks(id) {
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('/react-router')) return 'vendor-router'
          if (id.includes('/react-hook-form/') || id.includes('/zod/')) return 'vendor-forms'
        },
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./apps/test/setup.ts'],
    include: ['apps/**/*.test.{ts,tsx}'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps'),
      '@assets': path.resolve(__dirname, './apps/assets'),
      '@components': path.resolve(__dirname, './apps/components'),
      '@pages': path.resolve(__dirname, './apps/pages'),
      '@ui': path.resolve(__dirname, './apps/ui'),
      '@schemas': path.resolve(__dirname, './apps/schemas'),
      '@utils': path.resolve(__dirname, './apps/utils'),
      '@types': path.resolve(__dirname, './apps/types'),
    },
  },
})
