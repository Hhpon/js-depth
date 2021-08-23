import createElement from "./createElement"
import vNode from "./vNode"

export default function (oldVnode, newVnode) {
  if (oldVnode.sel === undefined) {
    // 这是一个dom节点
    oldVnode = vNode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点
    console.log("这好像是同一个节点")
  } else {
    // 不是同一个节点，插入新的，暴力删除原来的
    const newVnodeElm = createElement(newVnode)
    console.log(newVnode)

    // 在这里插入到老节点的前面，并且删除老节点
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)

    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}
