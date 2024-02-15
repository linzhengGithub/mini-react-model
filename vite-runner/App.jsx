import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
function Foo() {
  const [count, setCount] = React.useState(10)

  React.useEffect(() => {
    console.log('init');
    return () => {
      console.log('cleanup 0');
    }
  }, [])

  React.useEffect(() => {
    console.log('update1', count);
    return () => {
      console.log('cleanup 1');
    }
  }, [count])

  React.useEffect(() => {
    console.log('update2', count);
    return () => {
      console.log('cleanup 2');
    }
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
