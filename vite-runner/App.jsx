import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi - ', 'mini - react')
const Counter = ({ num }) => {
  return <div>count: {num}</div>
}

const App = () => {
  return (
    <div>
      hi-mini-react
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
    </div>
  )
}

export default App
