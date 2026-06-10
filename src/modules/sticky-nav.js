/**
 * Sticky nav: alterna o fundo da navegacao ao rolar.
 * --------------------------------------------------
 * Adiciona/remove a classe .is-stuck na .nav conforme a pagina
 * passa de um limiar de rolagem, dando o fundo translucido com blur.
 * O listener de scroll e passivo para nao travar a rolagem.
 */

import { NAV } from '../config.js'

/**
 * Inicia o comportamento sticky da nav.
 * @returns {void}
 */
export function initStickyNav() {
  const nav = document.querySelector('.nav')
  if (!nav) return

  const update = () => {
    nav.classList.toggle('is-stuck', window.scrollY > NAV.stuckOffset)
  }

  update() // aplica o estado correto ja no carregamento (ex.: reload no meio da pagina)
  window.addEventListener('scroll', update, { passive: true })
}
