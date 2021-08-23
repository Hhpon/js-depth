import { init, classModule, propsModule, styleModule, eventListenersModule, h, vnode } from "snabbdom"

// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const container = document.getElementById("container")
const btn = document.getElementById("btn")

const vNode1 = h("ul", {}, [h("li", {}, "A"), h("li", {}, "B"), h("li", {}, "C"), h("li", { key: "D" }, "D")])

patch(container, vNode1)

const vNode2 = h("ul", {}, [h("li", {}, "A"), h("li", {}, "B"), h("li", {}, "C"), h("li", { key: "d" }, "D"), h("li", {}, "E")])

btn.onclick = () => {
  patch(vNode1, vNode2)
}
