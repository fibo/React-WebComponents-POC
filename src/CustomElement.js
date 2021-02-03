class UnhandledAttributeChangeError extends Error {
  constructor ({ elementName, attributeName }) {
    super(`CustomElement ${elementName} does not handle ${attributeName} attribute change`)
  }
}

class UndefinedStaticAttributeElementNameError extends TypeError {
  constructor () {
    super('A CustomElement must define a static attribute "elementName"')
  }
}

export class CustomElement {
  static register ({ ElementClass }) {
    const { elementName } = ElementClass

    // Check "elementName" static attribute is defined.
    if (typeof elementName !== 'string') {
      throw new CustomElement.UndefinedStaticAttributeNameError()
    }

    // Avoid register custom element twice.
    if (customElements.get(elementName)) {
      return
    }

    try {
      customElements.define(elementName, ElementClass, ElementClass.defineOptions)
    } catch (error) {
      throw error
    }
  }

  static UnhandledAttributeChangeError = UnhandledAttributeChangeError
  static UndefinedStaticAttributeElementNameError = UndefinedStaticAttributeElementNameError
}
