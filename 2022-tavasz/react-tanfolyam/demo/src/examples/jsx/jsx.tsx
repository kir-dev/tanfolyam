import ReactDOM from 'react-dom'

const element = <h1>Hello world with variable</h1>
const myButton = (
    <button
        onClick={() => {
            alert('Kattttt')
        }}
    >
        Click
    </button>
)
const color = 'green'

export function renderDemo() {
    // Basic
    ReactDOM.render(<h1>Hello world</h1>, document.getElementById('jsx'))
    // Variable
    // ReactDOM.render(element, document.getElementById('jsx'))
    // Computed value
    // ReactDOM.render(<h1>Value: {5 + 5}</h1>, document.getElementById('jsx'))
    // Composition
    // ReactDOM.render(<h1>{myButton}</h1>, document.getElementById('jsx'))
    // Attributes
    // ReactDOM.render(
    //     <h1 style={{ color: color }} className="myHeading">
    //         Colorful wonderful
    //     </h1>,
    //     document.getElementById('jsx')
    // )
}
