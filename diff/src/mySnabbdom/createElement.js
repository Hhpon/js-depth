// 真正创建节点,将vnode创建dom，不再进行插入
export default function createElement(vnode) {
  // 巴虚拟节点vnode插入到pivot的前面
  let domNode = document.createElement(vnode.sel)

  // 有子节点/文本节点
  if ((vnode.text != "" && vnode.children == undefined) || vnode.children.length == 0) {
    // 内部是文本节点
    domNode.innerText = vnode.text

    // pivot.parentNode.insertBefore(domNode, pivot)
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    let chDOM
    for (let i = 0; i < vnode.children.length; i++) {
      chDOM = createElement(vnode.children[i])
      domNode.appendChild(chDOM)
    }
  }
  vnode.elm = domNode

  // 返回了创建的节点
  return vnode.elm
}
