import ReactDOM from 'react-dom';

const element = <h1>Hello world with variable</h1>;
const myButton = (
  <button
    onClick={() => {
      alert('Kattttt');
    }}
  >
    Click
  </button>
);
const color = 'green';

export function renderDemo() {
  const root = document.getElementById('jsx') as HTMLElement;

  // Basic
  ReactDOM.render(<h1>Hello world</h1>, root);
  // Variable
  // ReactDOM.render(element, root)
  // Computed value
  // ReactDOM.render(<h1>Value: {5 + 5}</h1>, root)
  // Composition
  // ReactDOM.render(<h1>{myButton}</h1>, root)
  // Attributes
  // ReactDOM.render(
  //     <h1 style={{ color: color }} className="myHeading">
  //         Colorful wonderful
  //     </h1>,
  //     root
  // )
}
