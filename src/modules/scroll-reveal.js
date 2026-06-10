/**
 * Scroll reveal: revela elementos conforme entram na viewport.
 * ------------------------------------------------------------
 * Observa todo elemento com a classe .reveal e adiciona .is-in
 * quando ele aparece, disparando a transicao definida no CSS.
 * Cada elemento e revelado uma unica vez (depois deixa de ser observado).
 *
 * Degrada com elegancia: se o usuario pede menos movimento ou o
 * navegador nao tem IntersectionObserver, tudo aparece de imediato.
 */

import { REVEAL } from '../config.js'

/**
 * Inicia o scroll reveal.
 * @returns {void}
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal')
  if (!elements.length) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const supportsObserver = 'IntersectionObserver' in window

  // Fallback: revela tudo sem animar.
  if (prefersReducedMotion || !supportsObserver) {
    elements.forEach((el) => el.classList.add('is-in'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target) // revela so uma vez
      })
    },
    { rootMargin: REVEAL.rootMargin, threshold: REVEAL.threshold }
  )

  elements.forEach((el) => observer.observe(el))
}
