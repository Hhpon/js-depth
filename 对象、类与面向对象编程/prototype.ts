function Person() {}

Person.prototype = {
  constructor: Person,
  name: "andy",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
}

let person1 = new Person()
let person2 = new Person()

person1.friends.push("Van")
person1.name = "刘德华"

console.log(person1.friends)
console.log(person2.friends)
console.log(person1.name)
console.log(person2.name)
