// 任务调度器
let nextWorkOfUnit = null
let root = null
function workLoop(deadLine) {
  let shouldYield = false

  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYield = deadLine.timeRemaining() < 1
  }

  if(!nextWorkOfUnit && root) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performWorkOfUnit(fiber) {
  // 1. 生成dom
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    // 2. 处理props
    updateProps(dom, fiber.props)
  }
  // 3. 建立链表关系 设置好指针关系
  initChildren(fiber)
  // 4. 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.sibling) {
    return fiber.sibling
  }
  
  return fiber.parent?.sibling
}

function commitRoot() {
  commitWork(root.child)
  root = null
}
function commitWork(fiber) {
  if(!fiber) return
  fiber.parent.dom.append(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function createDom(type) {
  return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

// 关键部分
function initChildren(fiber) {
  const children = fiber.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      parent: fiber,
      child: null,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  root = nextWorkOfUnit
  // const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)

  // Object.keys(el.props).forEach(key => {
  //   if (key !== 'children') {
  //     dom[key] = el.props[key]
  //   }
  // })

  // const children = el.props.children
  // children.forEach(child => {
  //   render(child, dom)
  // })

  // container.append(dom)
}

const React = {
  render,
  createElement
}

export default React
