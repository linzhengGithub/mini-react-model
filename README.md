# mini-react-model

## 问题: 加载过多的dom节点为什么会出现卡顿?

造成卡顿:
1. dom结构发生变化会造成回流,样式变化会造成重绘
2. 过多的dom节点增加渲染的复杂性
3. 每个dom节点都会占用内存,内存过高可能会触发浏览器的垃圾回收机制,引起卡顿
4. 事件处理器,如果每个节点都绑定了事件,会增加事件处理的开销
5. 未优化的JS代码,如循环中频繁修改DOM、使用同步的操作

优化措施:
1. 使用文档片段（DocumentFragment）：将多个DOM操作合并为一个文档片段再插入，减少回流次数。
2. 批量修改样式：将多个样式的修改合并为一次修改，减少重绘次数。
3. 虚拟列表或分页加载：只渲染可见区域的内容，而不是一次性渲染所有节点。
4. 事件委托：将事件处理器绑定在共同的父元素上，利用事件冒泡机制处理事件，减少事件处理器的数量。
5. 等等......
