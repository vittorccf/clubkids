import { defineConfig } from 'vite'

// GitHub Pages (project site) serve em /clubkids/.
// Em dev/preview usamos '/'. Imagens são referenciadas por <img> com caminho
// relativo (./img/...), então respeitam o base automaticamente.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/clubkids/' : '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
}))
