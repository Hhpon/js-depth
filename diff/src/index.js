import { h } from "./mySnabbdom/h"
import patch from "./mySnabbdom/patch"

// 获取dom节点
const container = document.getElementById("container")
const btn = document.getElementById('btn')

// const myVnode1 = h("h1", {}, "你好")
const myVnode1 = h("ul", {}, [h("li", {}, "A"), h("li", {}, "B"), h("li", {}, ["C"]), h("li", {}, "D")])

// 第一次上树
patch(container, myVnode1)

const myVnode2 = h("ul", {}, [h("li", {}, "A"), h("li", {}, "B"), h("li", {}, ["C"])])

btn.onclick = function () {
  patch(myVnode1, myVnode2)
}
