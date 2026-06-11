/**
 * Player de trilha sonora: toca a faixa da Vita ao acessar o site.
 * -----------------------------------------------------------------
 * Liga o <audio> da pagina ao botao de som da nav. A faixa comeca a
 * 25% de volume assim que possivel; o botao alterna entre tocar e
 * pausar, e o icone reflete o estado (alto-falante com ou sem ondas).
 *
 * Detalhe importante de navegador: autoplay COM som e bloqueado ate
 * que haja uma interacao do usuario (clique, toque, tecla, rolagem).
 * Por isso tentamos tocar de imediato e, se for barrado, agendamos o
 * inicio para o primeiro gesto do usuario — sem nunca forcar o som
 * contra a vontade de quem ja pausou.
 */

import { AUDIO } from '../config.js'

/**
 * Inicia o player e o controle de som.
 * @returns {void}
 */
export function initAudioPlayer() {
  const audio = document.querySelector('[data-audio]')
  const toggle = document.querySelector('[data-sound-toggle]')
  if (!audio || !toggle) return

  audio.volume = AUDIO.volume // 25% — presenca sem agredir

  // Reflete o estado atual (tocando/pausado) no botao: classe, rotulo
  // de acessibilidade e estado de pressionado.
  const sync = () => {
    const playing = !audio.paused
    toggle.classList.toggle('is-playing', playing)
    toggle.setAttribute('aria-pressed', String(playing))
    toggle.setAttribute(
      'aria-label',
      playing ? 'Pausar trilha sonora' : 'Tocar trilha sonora',
    )
  }

  // Mantem o icone em sincronia mesmo quando o estado muda por fora
  // do clique (ex.: autoplay aceito, fim da faixa que reinicia).
  audio.addEventListener('play', sync)
  audio.addEventListener('pause', sync)

  // Tenta iniciar agora; se o navegador barrar o autoplay com som,
  // espera o primeiro gesto do usuario para comecar.
  const tryPlay = () => audio.play()

  tryPlay().catch(() => {
    const startOnGesture = () => {
      // So inicia se o usuario ainda nao pausou manualmente.
      if (audio.paused) tryPlay().catch(() => {})
      removeGestureListeners()
    }
    const removeGestureListeners = () => {
      for (const evt of GESTURES) {
        window.removeEventListener(evt, startOnGesture)
      }
    }
    for (const evt of GESTURES) {
      window.addEventListener(evt, startOnGesture, { once: true, passive: true })
    }
  })

  // Clique no botao: alterna tocar/pausar.
  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  })

  sync() // estado inicial do icone
}

/** Gestos que liberam o autoplay com som quando ele e barrado. */
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'scroll']
