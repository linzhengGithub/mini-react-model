// 任务调度器
let nextWorkOfUnit = null
let currentRoot = null
let root = null
function workLoop(deadLine) {
  let shouldYield = false

  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYield = deadLine.timeRemaining() < 1
  }

  if (!nextWorkOfUnit && root) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 执行下一个任务
  if (fiber.child) {
    return fiber.child
  }

  // 循环找到兄弟节点
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    updateProps(dom, fiber.props, {})
  }

  const children = fiber.props.children
  initChildren(fiber, children)
}

function commitRoot() {
  commitWork(root.child)
  currentRoot = root
  root = null
}
function commitWork(fiber) {
  if (!fiber) return

  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }

  if (fiber.effectTag === 'update') {
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props)
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom)
    }
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function createDom(type) {
  return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}

function updateProps(dom, nextProps, prevProps) {
  // old 有 new 没有 删除
  Object.keys(prevProps).forEach(key => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key)
      }
    }
  })

  // new 有 old 没有 添加
  // new 有 old 有 修改
  Object.keys(nextProps).forEach(key => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith('on')) {
          const eventType = key.slice(2).toLowerCase()
          dom.removeEventListener(eventType, prevProps[key])
          dom.addEventListener(eventType, nextProps[key])
        } else {
          dom[key] = nextProps[key]
        }
      }
    }
  })
}

// 关键部分
function initChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child
  let prevChild = null
  children.forEach((child, index) => {
    const isSame = oldFiber && oldFiber.type === child.type
    let newFiber
    if (isSame) {
      newFiber = {
        type: child.type,
        props: child.props,
        parent: fiber,
        child: null,
        sibling: null,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: 'update'
      }
    } else {
      newFiber = {
        type: child.type,
        props: child.props,
        parent: fiber,
        child: null,
        sibling: null,
        dom: null,
        effectTag: 'placement'
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
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
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
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

function update() {
  nextWorkOfUnit = {
    dom: currentRoot,
    props: currentRoot.props,
    alternate: currentRoot
  }
  root = nextWorkOfUnit
}

const React = {
  update,
  render,
  createElement
}

export default React
