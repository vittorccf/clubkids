/**
 * Configuracao central do site (fonte unica de verdade para o JS).
 * ----------------------------------------------------------------
 * Reune os "numeros magicos" e parametros que as interacoes consomem,
 * para que ajustes nao exijam cacar valores espalhados pelos modulos.
 *
 * Observacao de arquitetura: os LINKS (ingressos, Instagram, Maps...)
 * NAO vivem aqui. Eles ficam diretamente nos `href` do HTML, que e a
 * fonte de verdade dos links: assim funcionam sem JS e sao indexaveis
 * por buscadores (progressive enhancement). O JS cuida so de comportamento.
 */

/** Dados do evento. */
export const EVENT = {
  /**
   * Data e hora de abertura dos portoes, em ISO 8601 com fuso de Brasilia (-03:00).
   * Alvo do contador regressivo. Deve bater com o startDate do JSON-LD no index.html.
   */
  startsAt: '2026-06-20T22:00:00-03:00',
}

/** Parametros das animacoes de entrada (scroll reveal). */
export const REVEAL = {
  /** Margem do IntersectionObserver: dispara um pouco antes de entrar 100%. */
  rootMargin: '0px 0px -8% 0px',
  /** Fracao visivel necessaria para revelar o elemento. */
  threshold: 0.08,
}

/** Parametros da navegacao fixa. */
export const NAV = {
  /** Rolagem (px) a partir da qual a nav ganha fundo (estado .is-stuck). */
  stuckOffset: 40,
}

/** Parametros da trilha sonora. */
export const AUDIO = {
  /** Volume inicial da faixa (0 a 1). 0.25 = 25%. */
  volume: 0.25,
}
