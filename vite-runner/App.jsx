import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
let count = 10
let props = {id: '123'}

const Counter = () => {
  function handleClick() {
    console.log('click');
    count++
    props = {}
    React.update()
  }
  return (<div {...props}>
    count: {count}
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
