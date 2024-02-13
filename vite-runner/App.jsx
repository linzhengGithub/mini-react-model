import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
let counterFoo = 1
function Foo() {
  console.log('Foo');
  const update = React.update()
  function handleClick() {
    counterFoo++
    update()
  }
  return <div>
    Foo
    {counterFoo}
    <button onClick={handleClick}>click</button>
  </div>
}

let counterBar = 1
function Bar() {
  console.log('Bar');
  const update = React.update()
  function handleClick() {
    counterBar++
    update()
  }
  return <div>
    Bar
    {counterBar}
    <button onClick={handleClick}>click</button>
  </div>
}
let counter = 1
const Counter = () => {
  console.log('Counter');
  const update = React.update()
  function handleClick() {
    counter++
    update()
  }
  return (<div>
    {counter}
    <button onClick={handleClick}>click</button>
    <Foo />
    <Bar />
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
