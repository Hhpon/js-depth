function isObject(val) {
  return typeof val === "object" && val !== null
}

function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key)
}

function isOn(key) {
  return /^on[A-Z]/.test(key)
}

const ShapeFlags = {
  ELEMENT: 1, // html标签
  TEXT: 1 << 1, //文本
  COMPONENT: 1 << 2, //组件

  TEXT_CHILDREN: 1 << 3, // 子元素是文本
  ARRAY_CHILDREN: 1 << 4, // 子元素是数组
  CHILDREN: (1 << 3) | (1 << 4), //3|4就是两种情况合并，就是有子元素
}

exports = { isObject, hasOwn, isOn, ShapeFlags }
