import { it, expect, describe } from 'vitest'
import React from '../core/React.js';

describe('create element test', () => {
  it('should create element', () => {
    const el = React.createElement('div', {id: 'app'}, 'hi-mini-react')

    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hi-mini-react",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "app",
        },
        "type": "div",
      }
    `)
  })
})
