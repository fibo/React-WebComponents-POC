import { SvgIcon, SvgIconElement } from './components/SvgIcon'
import { useCustomElements } from './hooks/useCustomElements'

export function App() {
  useCustomElements({
    customElements: [SvgIconElement],
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
          <h2>Icons</h2>

          <div>
            <SvgIcon size='2em'/>
          </div>
        </section>
      </article>
    </div>
  );
}
