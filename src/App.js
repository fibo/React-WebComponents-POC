import { SvgIcon, SvgIconElement } from './components/SvgIcon'
import { TicTacToe, TicTacToeElement } from './components/TicTacToe'
import { useCustomElements } from './hooks/useCustomElements'

export function App() {
  useCustomElements({
    customElements: [
      SvgIconElement,
      TicTacToeElement
    ],
    setErrors: (errors = []) => {
      errors.forEach((error) => {
        throw error
      })
    }
  })

  return (
    <div>
      <article>
        <header>
          <h1>React WebComponents POC</h1>
        </header>

        <section>
          <h2>Customized built-in element</h2>

          <p>
            The following icon uses the <code>is</code> attribute to extend a <code>span</code> element.
          </p>

          <div>
            <SvgIcon size='2em'/>
          </div>
        </section>

        <section>
          <h2>Autonomous custom element</h2>

          <p>
            This is a custom element <code>tic-tac-toe</code>.
          </p>

          <div>
            <TicTacToe />
          </div>
        </section>
      </article>
    </div>
  );
}
