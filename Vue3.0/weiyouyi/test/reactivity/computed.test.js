const { reactive } = require("../../src/back/reactive")
const { computed } = require("../../src/reactivity/computed")
var expect = require("chai").expect

console.log(reactive)

describe("computed测试", () => {
  it("computed基本使用", () => {
    const ret = reactive({ count: 1 })
    const num = reactive({ value: 2 })
    const sum = computed(() => num.value + ret.count)
    expect(sum.value).toBe(3)

    ret.count++
    expect(sum.value).toBe(4)
    num.value = 10
    expect(sum.value).toBe(12)
  })
})
