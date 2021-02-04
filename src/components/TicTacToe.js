export class TicTacToeElement extends HTMLElement {
  static elementName = 'tic-tac-toe'

  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.17);
      }
      :host div {
        text-align: center;
        padding: 1em;
        transition: background-color 0.17s ease;
        user-select: none;
      }
      :host div {
        min-height: 3em;
        background-color: white;
      }
      :host div:hover {
        background-color: azure;
      }
      :host div[selected] {
        background-color: azure;
      }
    `

    shadow.appendChild(style)

    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div')

      div.addEventListener('pointerdown', (event) => {
        const { target } = event

        if (target.hasAttribute('selected')) {
          target.removeAttribute('selected')
        } else {
          target.setAttribute('selected', '')
        }
      })
      shadow.appendChild(div)
    }
  }
}

export function TicTacToe () {
  return (
    <tic-tac-toe />
  )
}

