import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
let show = false
const Counter = () => {
  function Foo() {
    return <div>
      foo
    </div>
  }
  function handleClick() {
    show = !show
    React.update()
  }
  return (<div>
    {show && <Foo />}
    bar
    <button onClick={handleClick}>click</button>
  </div>)
}

const App = () => {
  return (
    <div>
      hi-mini-react
      <Counter></Counter>
    </div>
  )
}

export default App
