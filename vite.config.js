import { defineConfig } from 'vite'

/**
 * Configuracao do Vite.
 *
 * base '/': o site e servido na raiz do dominio proprio (festaclubkids.com.br).
 * As imagens usam caminho relativo (./img/...), entao funcionam em qualquer host.
 *
 * assetsInlineLimit: assets menores que 4 KB viram data URI embutida (menos
 * requisicoes); acima disso, sao emitidos como arquivos com hash no nome.
 */
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
})
