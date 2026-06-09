import { defineConfig } from 'vite'

// Servido na raiz do domínio próprio (festaclubkids.com.br), então base '/'.
// As imagens usam caminho relativo (./img/...), funcionando em qualquer host.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
})
