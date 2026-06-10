/**
 * Entrypoint da aplicacao (carregado por index.html como modulo).
 * ---------------------------------------------------------------
 * Responsabilidade unica: importar os estilos e orquestrar a
 * inicializacao das interacoes. Toda a logica vive nos modulos de
 * ./modules; aqui so amarramos as pecas.
 *
 * Como e um <script type="module">, o navegador o executa apos o
 * parse do HTML (comportamento "defer"), entao o DOM ja esta pronto
 * quando este codigo roda.
 */

import './styles/index.css'

import { initCountdown } from './modules/countdown.js'
import { initScrollReveal } from './modules/scroll-reveal.js'
import { initStickyNav } from './modules/sticky-nav.js'

initCountdown()    // contador regressivo do hero
initScrollReveal() // animacoes de entrada ao rolar
initStickyNav()    // fundo da nav ao rolar
