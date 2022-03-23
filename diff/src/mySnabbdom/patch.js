import { vnode } from "snabbdom";
import createElement from "./createElement"
import vNode from "./vNode"

export default function (oldVnode, newVnode) {
  if (oldVnode.sel === undefined) {
    // 这是一个dom节点
    oldVnode = vNode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点
    // 判断新旧vnode是否是同一个对象
    if (oldVnode === newVnode) return
    // 判断新vnode是否含有text属性
    if (newVnode.text !== undefined && newVnode.children == undefined || newVnode.children.length === 0) {
      console.log('newVnode 有text 属性');
      if (newVnode.text !== oldVnode.text) {
        // 如果新虚拟节点中的text和虚拟节点的text不同，那么直接让新的text写入老的elm中即可，老的vnode中的children会自动消失
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      console.log('newVnode 没有text 属性');
      // 判断老的有没有children
      if (oldVnode.children != undefined && oldVnode.children.length > 0) {
        // 老的有children，此时就是最复杂的情况，新老都有children
      } else {
        // 老的没有children
        // 清空老节点的内容
        oldVnode.elm.innerHTML = ''
        for (let i = 0; i < newVnode.children.length; i++) {
          oldVnode.elm.appendChild(createElement(newVnode.children[i]))
        }
      }
    }
  } else {
    // 不是同一个节点，插入新的，暴力删除原来的
    const newVnodeElm = createElement(newVnode)
    console.log(newVnode)

    // 在这里插入到老节点的前面，并且删除老节点
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)

    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}
