import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
function Foo() {
  const [count, setCount] = React.useState(10)

  React.useEffect(() => {
    console.log('init');
  }, [])

  React.useEffect(() => {
    console.log('update', count);
  }, [count])

  function handleClick() {
    setCount((c) => c + 1)
  }

  return <div>
    {count}
    <button onClick={handleClick}>click</button>
  </div>
}

const App = () => {
  return (
    <div>
      hi-mini-react
      <Foo></Foo>
    </div>
  )
}

export default App
