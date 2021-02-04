import { useCallback, useEffect, useRef, useState } from 'react'

const selectCellEventName = 'selecttictactoecell'
const selectedByPlayerAttributeName = 'selectedbyplayer'
const nextPlayerAttributeName = 'nextplayer'
const player1 = 'player1'
const player2 = 'player2'

export class TicTacToeElement extends HTMLElement {
  static elementName = 'tic-tac-toe'

  static selectedByPlayerAttributeName = selectedByPlayerAttributeName
  static selectCellEventName = selectCellEventName
  static player1 = player1
  static player2 = player2

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
      :host div[${selectedByPlayerAttributeName}=${player1}] {
        background-color: pink;
      }
      :host div[${selectedByPlayerAttributeName}=${player2}] {
        background-color: darkseagreen;
      }
    `
    shadow.appendChild(style)

    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const div = document.createElement('div')

      div.addEventListener('pointerdown', (event) => {
        event.stopPropagation()

        const { target } = event
        const { nextPlayer } = this

        const wasSelected = target.hasAttribute(selectedByPlayerAttributeName)

        if (wasSelected) {
          // Do not select twice.
        } else {
          const selectTicTacToeCellEvent = new CustomEvent(
            selectCellEventName, {
              detail: {
                cellIndex,
                isSelected: !wasSelected,
                nextPlayer: player1
              }
            }
          )

          this.dispatchEvent(selectTicTacToeCellEvent)

          target.setAttribute(selectedByPlayerAttributeName, nextPlayer)
          this.toggleNextPlayer()
        }
      })

      shadow.appendChild(div)
    }

    this.resetBoard()
  }

  get nextPlayer () {
    return this.getAttribute(nextPlayerAttributeName)
  }

  resetBoard () {
    this.setAttribute(nextPlayerAttributeName, player1)
  }

  toggleNextPlayer () {
    const { nextPlayer } = this

    switch (nextPlayer) {
      case player1: {
        this.setAttribute(nextPlayerAttributeName, player2)
        break
      }
      case player2: {
        this.setAttribute(nextPlayerAttributeName, player1)
        break
      }
      default: break
    }
  }
}

const emptyCell = 'emptyCell'
const emptyCells = () => new Array(9).fill(emptyCell)

export function TicTacToe () {
  const ref = useRef()

  const [cellsSelection, setCellsSelection] = useState(emptyCells())

  const handleSelectCellEvent = useCallback((event) => {
    const {
      cellIndex,
      isSelected,
      nextPlayer
    } = event.detail

    if (isSelected) {
      setCellsSelection((cellsSelection) => cellsSelection.map(
        (cellSelection, i) => {
          if (i === cellIndex) {
            return nextPlayer
          } else {
            return cellSelection
          }
        }
      ))
    }
  }, [])

  useEffect(() => {
    const element = ref.current

    if (element) {
      element.addEventListener(selectCellEventName, handleSelectCellEvent)
    }

    return () => {
      if (element) {
        element.removeEventListener(selectCellEventName, handleSelectCellEvent)
      }
    }
  }, [ref])

  useEffect(() => {
    const allCellsAreSelected = cellsSelection.every((cellSelection) => cellSelection !== emptyCell)

    if (allCellsAreSelected) {
      setCellsSelection(emptyCells())
    }
  }, [cellsSelection])

  return (
    <tic-tac-toe
      ref={ref}
    />
  )
}

