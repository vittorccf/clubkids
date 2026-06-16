/**
 * Lista VIP: envio do formulario T/NB & PCD para o Google Forms.
 * ------------------------------------------------------------
 * O <form> ja aponta (action/method) para o endpoint formResponse do
 * Google, com target em um iframe oculto: isso faz o envio funcionar
 * mesmo sem este JS (progressive enhancement). Aqui apenas:
 *   - validamos com a UI nativa do navegador antes de enviar;
 *   - enviamos via fetch (no-cors) para nao recarregar a pagina;
 *   - trocamos o botao por uma mensagem de sucesso.
 *
 * Observacao: requisicoes no-cors devolvem resposta "opaca" (nao da
 * para ler status). O Google registra a resposta de qualquer forma,
 * entao tratamos a conclusao do fetch como sucesso.
 */

/**
 * Inicia o comportamento do formulario da lista VIP.
 * @returns {void}
 */
export function initFormList() {
  const form = document.querySelector('[data-vip-form]')
  if (!form) return

  const submit = form.querySelector('[data-vip-submit]')
  const okMsg = form.querySelector('[data-vip-ok]')
  const errMsg = form.querySelector('[data-vip-err]')

  form.addEventListener('submit', (event) => {
    // Sem fetch (navegador antigo): deixa o envio nativo via iframe seguir.
    if (typeof window.fetch !== 'function') return

    event.preventDefault()

    // Marca o form para o CSS so realcar campos invalidos apos a tentativa.
    form.classList.add('is-validated')
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    errMsg.hidden = true
    submit.disabled = true
    submit.textContent = 'Enviando...'

    fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      body: new FormData(form),
    })
      .then(() => {
        // Sucesso: esconde os campos e mostra a confirmacao.
        Array.from(form.querySelectorAll('.vip-field')).forEach((el) => { el.hidden = true })
        submit.hidden = true
        form.querySelector('.vip-form__note')?.setAttribute('hidden', '')
        okMsg.hidden = false
        okMsg.focus?.()
      })
      .catch(() => {
        // Falha de rede: reabilita e mostra alternativa.
        submit.disabled = false
        submit.textContent = 'Entrar na lista'
        errMsg.hidden = false
      })
  })
}
