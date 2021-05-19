/**
 * Vue 入口
 * @param options 配置参数
 * **/

function MyVue(options) {
  this.$el = options.el
  this.$data = options.data
  this.$options = options

  if (!this.$el) throw new Error("el是必须的")

  // 1.实现观察者
  // 2.实现模版编译器
  /**
   * 模版编译器
   * @param el 根节点
   * @param vm Vue实例
   */
  function Compile(el, vm) {
    // 判断el是Dom对象还是CSS选择器字符串
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1.创建文档碎片，减少页面的回流和重绘
    var documentFragment = this.nodeToDocumentFragment(this.el)
    // 2.编译模版
    // 3.将编译好的节点对象重新放回根节点中
  }

  /**
   * 将节点转换成文档碎片对象
   * @param node 节点对象
   * @return 文档碎片对象
   */
  Compile.prototype.nodeToDocumentFragment = function (node) {
    //  创建文档碎片对象
    var documentFragment = document.createDocumentFragment()
    // 遍历根节点的所有子节点
    var firstChild
    while ((firstChild = node.firstChild)) {
      // 将子节点放入文档碎片对象中
      // 放入文档碎片后，页面上原有的节点会消失
      // 所以只要不断获取页面的第一个节点即可
      documentFragment.appendChild(firstChild)
    }
  }

  /**
   * 判断传入的节点是否是元素节点
   * @param node 节点对象
   * @return 是否元素节点
   */
  Compile.prototype.isElementNode = function (node) {
    // 元素节点的nodeType为1
    return node.nodeType === 1
  }
}
