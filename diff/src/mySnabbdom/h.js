import vNode from "./vNode"

// 编写一个低版本的h函数
// 未实现函数重载
export function h(sel, b, c) {
  if (arguments.length !== 3) {
    throw new Error('h函数的参数必须是三个')
  }
  let data = b
  let children = undefined
  let text = ''
  if (Array.isArray(c)) {
    children = c
    for (let i = 0; i < children.length; i++) {
      console.log(typeof children[i])
      if (typeof children[i] !== 'object' && typeof children[i] !== 'function') {
        children[i] = vNode(undefined, undefined, undefined, children[i], undefined)
      }
    }
  } else if (typeof c === 'object') {
    children = [c]
  } else {
    text = c
  }
  return vNode(sel, data, children, text, undefined)
}