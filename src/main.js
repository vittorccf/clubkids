import './style.css'

/* ============================================================
   CLUB KIDS — interações
   ============================================================ */

/* -------- 1. CONFIG DE LINKS (preencha aqui) -------------------
   Centralize as URLs reais. Tudo que tem data-ingresso / data-maps
   é atualizado automaticamente. Deixe vazio ("") para manter "#". */
const LINKS = {
  ingresso: 'https://shotgun.live/pt-br/events/clubypride',
  maps:     'https://www.google.com/maps/search/?api=1&query=Vernissage+Club+Goi%C3%A2nia',
}
function aplicarLinks() {
  for (const [chave, attr] of [['ingresso', 'data-ingresso'], ['maps', 'data-maps']]) {
    const url = LINKS[chave]
    if (!url) continue
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      el.setAttribute('href', url)
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noopener')
    })
  }
}

/* -------- 2. CONTADOR REGRESSIVO -------------------------------
   Alvo: 20/06/2026 22:00, portas (horário de Brasília, -03:00). */
const ALVO = new Date('2026-06-20T22:00:00-03:00').getTime()
const elDias  = document.querySelector('[data-cd="dias"]')
const elHoras = document.querySelector('[data-cd="horas"]')
const elMin   = document.querySelector('[data-cd="min"]')
const elSeg   = document.querySelector('[data-cd="seg"]')
const pad = (n) => String(n).padStart(2, '0')

function tickCountdown() {
  if (!elDias) return
  const diff = ALVO - Date.now()
  if (diff <= 0) {
    elDias.textContent = elHoras.textContent = elMin.textContent = elSeg.textContent = '00'
    const cd = document.getElementById('countdown')
    if (cd && !cd.dataset.done) {
      cd.dataset.done = '1'
      cd.setAttribute('aria-label', 'O evento começou')
    }
    return
  }
  const s = Math.floor(diff / 1000)
  elDias.textContent  = pad(Math.floor(s / 86400))
  elHoras.textContent = pad(Math.floor((s % 86400) / 3600))
  elMin.textContent   = pad(Math.floor((s % 3600) / 60))
  elSeg.textContent   = pad(s % 60)
}

/* -------- 3. SCROLL REVEAL (IntersectionObserver) -------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal')
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduz || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  els.forEach((el) => io.observe(el))
}

/* -------- 4. NAV: estado "stuck" ao rolar ---------------------- */
function initNav() {
  const nav = document.querySelector('.nav')
  if (!nav) return
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* -------- INIT -------------------------------------------------- */
aplicarLinks()
initReveal()
initNav()
tickCountdown()
setInterval(tickCountdown, 1000)
