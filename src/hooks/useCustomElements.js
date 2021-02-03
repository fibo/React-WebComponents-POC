import { useEffect } from 'react'

import { CustomElement } from '../CustomElement'

export function useCustomElements({
  customElements = [],
  setErrors = Function.prototype
} = {
  customElements: [],
  setErrors: Function.prototype
}) {
  useEffect(() => {
    const errors = []

    customElements.forEach((ElementClass) => {
      try {
        CustomElement.register({ ElementClass })
      } catch (error) {
        console.error(error)

        errors.push(error)
      }
    })

    setErrors(errors)
  }, [])
}
