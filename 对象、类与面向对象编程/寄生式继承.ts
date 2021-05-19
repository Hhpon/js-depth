let person = {
  name: "Bicholas",
  friends: ["Shelby", "Court", "Van"],
}

function createAnother(original) {
  let clone = Object.create(original)
  clone.sayHi = function () {
    console.log("hi")
  }
  return clone
}

let anotherPerson = createAnother(person)

anotherPerson.sayHi()

anotherPerson.friends.push("Rob")
anotherPerson.name = "andy"

console.log(anotherPerson)

console.log(person)
