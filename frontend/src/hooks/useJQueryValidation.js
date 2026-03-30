/**
 * useJQueryValidation — jQuery Validate wrapper for React forms.
 * Safe in React 18 StrictMode (handles double-effect invocation).
 *
 * @param {string}   formId   — `id` attribute on the <form> element
 * @param {object}   rules    — jQuery Validate rules object
 * @param {object}   messages — jQuery Validate messages object
 */
import { useEffect, useRef } from 'react'

const injectStyles = () => {
  if (document.getElementById('jqv-styles')) return
  const style = document.createElement('style')
  style.id = 'jqv-styles'
  style.textContent = `
    label.jqv-error {
      display: block;
      color: #dc2626;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 4px;
    }
    input.jqv-field-error,
    textarea.jqv-field-error,
    select.jqv-field-error {
      border-color: #fca5a5 !important;
      background-color: #fff7f7 !important;
    }
    input.jqv-field-valid,
    textarea.jqv-field-valid,
    select.jqv-field-valid {
      border-color: #86efac !important;
    }
  `
  document.head.appendChild(style)
}

const destroySafe = ($, formEl) => {
  try {
    // jQuery Validate stores the instance on the element's data
    const existing = $ && $.data && $.data(formEl, 'validator')
    if (existing && typeof existing.destroy === 'function') {
      existing.destroy()
    }
  } catch (_) { /* ignore */ }
}

const useJQueryValidation = (formId, rules, messages) => {
  const validatorRef = useRef(null)

  useEffect(() => {
    injectStyles()

    const $ = window.$
    if (!$ || !$.fn || !$.fn.validate) return

    const $form = $(`#${formId}`)
    if (!$form.length) return

    const formEl = $form[0]

    // StrictMode: destroy any existing validator before re-init
    destroySafe($, formEl)
    validatorRef.current = null

    validatorRef.current = $form.validate({
      rules,
      messages,
      errorClass: 'jqv-error',
      validClass: 'jqv-valid',
      errorPlacement(error, element) {
        error.insertAfter(element)
      },
      highlight(element) {
        $(element).addClass('jqv-field-error').removeClass('jqv-field-valid')
      },
      unhighlight(element) {
        $(element).removeClass('jqv-field-error').addClass('jqv-field-valid')
      },
    })

    return () => {
      destroySafe($, formEl)
      validatorRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId])

  /**
   * Call inside your React submit handler (after e.preventDefault()).
   * Returns true if the form passes all rules, false otherwise.
   */
  const triggerValidation = () => {
    const $ = window.$
    if (!$ || !$.fn || !$.fn.validate) return true
    const $form = $(`#${formId}`)
    if (!$form.length) return true
    return $form.valid()
  }

  return { triggerValidation }
}

export default useJQueryValidation
