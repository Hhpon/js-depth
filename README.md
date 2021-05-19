### 2021年3月面试学习计划
---

#### Javascript 基础知识

- [this指向(文章内容)](!https://juejin.cn/post/6942827209015066660)(闭包this内容)
- ~~Promise手写实现~~
- ~~实现Promise.all, Promise.allSettled~~
- ~~事件队列~~
- ~~hash路由与history路由(了解单页面应用popstate与hashchange机制不同)~~
- ~~引用类型的深拷贝~~
- ~~bind方法的实现~~
- ~~apply、call方法的实现~~
- ~~instanceof方法的实现~~
- ~~for循环相关的知识，比如for...in 与 for...of 的区别~~
- 迭代器与生成器
- ~~节流和防抖~~
- ~~闭包是什么，闭包有什么应用~~
- ~~bind、call、apply方法之间的区别~~
- ~~Js 事件~~
- ~~垃圾回收~~
- 判断DOM标签的合法性，标签的闭合，span里面不能有div，写一个匹配DOM标签的正则
- 获取一段DOM节点中标签个数最多的标签
- 替换日期格式，xxxx-yy-zz 替换成 xxxx-zz-yy
- ~~手写ES6的继承~~
- requestAnimationFrame 是宏任务还是微任务
- 实现promise A+规范可以知道promise.resolve是通过settimeout实现的异步，但是为什么settimeout是宏任务，而promise是微任务呢？
- promise 的实例方法
- promise.all 的方法中所有的promise是并发执行的吗

#### 浏览器

- 浏览器缓存

#### http协议

- ~~http状态码~~
- ~~浏览器缓存(强缓存、协商缓存)~~
- 输入URL到渲染全过程
  - DNS 解析 (寻找IP地址的过程)
    - DNS 缓存
    - DNS 查找过程
    - DNS 优化
  - TCP 建立连接
    - 三次握手的具体内容
    - 四次挥手的具体内容
    - 为什么非得三次/四次握手/挥手
  - 发送HTTP请求
  - 服务端处理请求
  - 渲染html
  - TCP 断开连接
- 1.0与2.0之间主要有哪些变化
- HTTP2， HTTP2的性能优化方面，真的优化很多么?
- 前端跨域相关的字段有哪些
- HTTPS的整个详细过程
- [301和302的区别](!https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- 怎么用get实现post，就是使用get方法但是参数放到request body中
- TCP和UDP的区别
  - [TCP和UDP比较](!https://juejin.cn/post/6844903800336023560)
  - [TCP和UDP的区别](!https://zhuanlan.zhihu.com/p/24860273)

#### 深入Vue原理

- ~~[Vue 双向绑定](!https://juejin.cn/post/6942069977843236895)~~
- ~~Vue-Router~~
- diff 算法
- Vue 自定义指令懒加载
- Vuex 原理
- vue 父子组件之间传值 
- event bus

#### Angular 原理

- ~~依赖注入~~
- ~~Angular 生命周期~~

#### 数据结构与算法

- 数据结构与算法
- [斐波那契数列](!https://leetcode-cn.com/problems/fibonacci-number/)
- ~~栈~~
- ~~单调栈~~
- ~~队列~~
- ~~双向队列~~
- ~~链表~~
- ~~集合~~
- ~~字典~~
- ~~递归~~
- 二叉树
- [二叉树的最大深度](!https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [另一个树的子树](!https://leetcode-cn.com/problems/subtree-of-another-tree/)
- [相同的树](!https://leetcode-cn.com/problems/same-tree/)
- [翻转二叉树](!https://leetcode-cn.com/problems/invert-binary-tree/)
- [合并两个数组](!https://leetcode-cn.com/problems/merge-sorted-array/)
- [打乱数组](!https://leetcode-cn.com/problems/shuffle-an-array/)
- 数组区间

#### 项目经验

- 二向箔中遇到的难点是什么(高阶组件、组件封装的原则)
- 组件封装的原则

#### 前端工程化

- webpack