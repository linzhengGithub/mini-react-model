// v1
// const app = document.createElement('div')
// app.id = 'app'
// document.querySelector('#root').append(app)

// const textNode = document.createTextNode('')
// textNode.nodeValue = 'app'
// app.append(textNode)

// v2 vdom -> js object
// const textEl = {
//   type: 'TEXT_ELEMENT',
//   props: {
//     nodeValue: 'app',
//     children: []
//   }
// }
// const el = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [textEl]
//   }
// }

import React from './core/React.js';
import ReactDom from './core/ReactDom.js';
import App from './App.jsx';

ReactDom.createRoot(document.querySelector('#root')).render(<App></App>)
