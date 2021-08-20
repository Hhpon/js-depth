import { h } from "./mySnabbdom/h";

console.log(h('div', {}, '百度'))
console.log(h('div', {}, [
  h('div', {}, '搜狐')
]))
console.log(h('div', {}, h('div', {}, '搜狐')))
