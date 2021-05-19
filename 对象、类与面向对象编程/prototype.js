function Person() { }
Person.prototype = {
    constructor: Person,
    name: "andy",
    age: 29,
    job: "Software Engineer",
    frinends: ["Shelby", "Court"]
};
var person1 = new Person();
var person2 = new Person();
person1.frinends.push("Van");
console.log(person1);
console.log(person2);
