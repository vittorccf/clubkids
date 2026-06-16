/**
 * Lista VIP: envio do formulario T/NB & PCD para o Google Forms.
 * ------------------------------------------------------------
 * O <form> aponta (action/method) para o endpoint formResponse do
 * Google e tem target em um <iframe> oculto. Deixamos o envio nativo
 * seguir para esse iframe: assim o POST funciona sem CORS e sem sair
 * da pagina (funciona ate sem este JS). Aqui apenas:
 *   - validamos com a UI nativa do navegador antes de enviar;
 *   - trocamos o botao por "Enviando..." enquanto o POST acontece;
 *   - mostramos a confirmacao quando o iframe termina de carregar.
 *
 * O Google responde com uma pagina cross-origin (nao da para ler o
 * conteudo), mas o evento 'load' do iframe dispara mesmo assim. Como
 * garantia extra, um timeout libera a confirmacao caso o 'load' nao
 * chegue, para o botao nunca ficar preso em "Enviando...".
 */

/**
 * Inicia o comportamento do formulario da lista VIP.
 * @returns {void}
 */
export function initFormList() {
  const form = document.querySelector('[data-vip-form]')
  if (!form) return

  const sink = document.querySelector('iframe[name="vip-form-sink"]')
  const submit = form.querySelector('[data-vip-submit]')
  const okMsg = form.querySelector('[data-vip-ok]')
  const errMsg = form.querySelector('[data-vip-err]')

  let submitting = false   // virou true so depois de um envio valido
  let settled = false      // garante que a confirmacao apareca uma unica vez
  let safety = 0           // id do timeout de seguranca

  /** Mostra o estado de sucesso e esconde os campos. */
  function showSuccess() {
    if (settled) return
    settled = true
    clearTimeout(safety)
    Array.from(form.querySelectorAll('.vip-field')).forEach((el) => { el.hidden = true })
    submit.hidden = true
    form.querySelector('.vip-form__note')?.setAttribute('hidden', '')
    okMsg.hidden = false
  }

  form.addEventListener('submit', (event) => {
    form.classList.add('is-validated') // CSS so realca invalidos apos tentar

    if (!form.checkValidity()) {
      event.preventDefault()
      form.reportValidity()
      return
    }

    // Envio valido: deixa o POST nativo seguir para o iframe oculto.
    submitting = true
    settled = false
    errMsg.hidden = true
    submit.disabled = true
    submit.textContent = 'Enviando...'

    // Rede de seguranca: a resposta do Google quase sempre ja foi gravada
    // antes disso; libera a confirmacao mesmo que o 'load' nao dispare.
    safety = window.setTimeout(showSuccess, 2500)
  })

  // O iframe dispara 'load' uma vez no carregamento inicial (vazio) e de novo
  // ao terminar o POST. So tratamos como sucesso apos um envio valido.
  sink?.addEventListener('load', () => {
    if (!submitting) return
    submitting = false
    showSuccess()
  })
}
