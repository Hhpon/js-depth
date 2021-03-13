// promise.all 如果可迭代对象为空时，promise直接返回完成的状态

const p = Promise.all([])

console.log(p);

setTimeout(function() {
  console.log('the stack is now empty');
  console.log(p);
})