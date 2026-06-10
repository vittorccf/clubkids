/**
 * Contador regressivo ate a abertura dos portoes.
 * ------------------------------------------------
 * Atualiza, a cada segundo, as quatro celulas (dias/horas/min/seg)
 * marcadas no HTML com [data-cd="..."]. Ao chegar a zero, zera o
 * display e ajusta o rotulo acessivel para "o evento comecou".
 */

import { EVENT } from '../config.js'

/** Formata um numero com dois digitos (ex.: 7 -> "07"). */
const pad = (n) => String(n).padStart(2, '0')

/**
 * Inicia o contador regressivo.
 * @param {string} [targetIso=EVENT.startsAt] Data-alvo em ISO 8601.
 * @returns {void}
 */
export function initCountdown(targetIso = EVENT.startsAt) {
  const root = document.getElementById('countdown')
  const cells = {
    dias:  document.querySelector('[data-cd="dias"]'),
    horas: document.querySelector('[data-cd="horas"]'),
    min:   document.querySelector('[data-cd="min"]'),
    seg:   document.querySelector('[data-cd="seg"]'),
  }
  // Sem marcacao no HTML nao ha o que atualizar: aborta silenciosamente.
  if (!root || !cells.dias) return

  const targetMs = new Date(targetIso).getTime()

  /** Calcula o tempo restante e escreve nas celulas. */
  const tick = () => {
    const diffMs = targetMs - Date.now()

    // Evento ja comecou (ou passou): zera tudo uma unica vez e encerra.
    if (diffMs <= 0) {
      cells.dias.textContent = cells.horas.textContent = '00'
      cells.min.textContent = cells.seg.textContent = '00'
      if (!root.dataset.done) {
        root.dataset.done = '1'
        root.setAttribute('aria-label', 'O evento começou')
      }
      return
    }

    const totalSeconds = Math.floor(diffMs / 1000)
    cells.dias.textContent  = pad(Math.floor(totalSeconds / 86400))
    cells.horas.textContent = pad(Math.floor((totalSeconds % 86400) / 3600))
    cells.min.textContent   = pad(Math.floor((totalSeconds % 3600) / 60))
    cells.seg.textContent   = pad(totalSeconds % 60)
  }

  tick()                  // pinta imediatamente, sem esperar 1s
  setInterval(tick, 1000) // e segue atualizando a cada segundo
}
