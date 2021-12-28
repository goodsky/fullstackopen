
// object literals
const person = {
    name: 'Skyler Goodell',
    age: 30,
    education: 'BS'
};

const course = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
};

const student = {
    name: {
        first: 'Skyler',
        last: 'Goodell',
    },
    grades: [100, 92, 96, 85],
    department: 'Home School',
};

// properties can be accessed using either dot or brackets
console.log(person.name);
console.log(person['name']);

// properties can be added 'on the fly' using either dot or brackets
person.address = 'Earth';
person['super secret'] = 42; // note: this is a valid property, but it can only be accessed using brackets due to the space character

// prototypes and constructor functions... exist

this.someGlobalValue = 'this is the global scope';

function Person(name, age, education) {
    this.name = name;
    this.age = age;
    this.education = education;
};

const PersonExpression = function(name, age, education) {
    this.name = name;
    this.age = age;
    this.education = education;
}

// GOTCHA!!!
// Aha! I can't use an arrow function when creating a constructor function!
// const Person = (name, age, education) => { ... }
// Person.prototype.sayHello = () -> { ... } // TypeError: Cannot set properties of undefined (setting 'sayHello')
console.log(`When defining PersonArrowExpression 'this' = ${JSON.stringify(this)}`);
const PersonArrowExpression = (name, age, education) => {
    // BE CAREFUL!
    // 'this' here is not rebound, but bound to the current scope's 'this'
    // i.e. since 'this' is undefined right now, 'this' will be undefined when we run this function.
    console.log(`Inside PersonArrowExpression 'this' = ${JSON.stringify(this)}`);
    this.name = name;
    this.age = age;
    this.education = education;
}

// GOTCHA!!
// Agh! I can't use an arrow function when creating a prototype function!
// It appears to use the wrong 'this' when running as an arrow function!
Person.prototype.sayHello = function() {
    console.log(`Inside Person.sayHello 'this' = ${JSON.stringify(this)}`);
    console.log(`Hello ${this.name}! You are ${this.age} years old.`);
};

PersonExpression.prototype.sayHello = function() {
    console.log(`Inside PersonExpression.sayHello 'this' = ${JSON.stringify(this)}`);
    console.log(`Hello ${this.name}! You are ${this.age} years old.`);
};

console.log(`When defining PersonExpression.sayHelloWithArrow 'this' = ${JSON.stringify(this)}`);
PersonExpression.prototype.sayHelloWithArrow = () => {
    // BE CAREFUL!
    // 'this' here is not rebound, but bound to the current scope's 'this'
    // i.e. since 'this' is undefined right now, 'this' will be undefined when we run this function.
    console.log(`Inside PersonExpression.sayHelloWithArrow 'this' = ${JSON.stringify(this)}`);
    console.log(`Hello ${this.name}! You are ${this.age} years old.`);
}

// The differences between arrow functions and expressions:
// https://stackoverflow.com/questions/31755186/es6-arrow-functions-not-working-on-the-prototype
// https://stackoverflow.com/questions/34361379/are-arrow-functions-and-functions-equivalent-interchangeable

// tl;dr: No! Arrow functions and function declarations / expressions are not equivalent and cannot be replaced blindly.
// If the function you want to replace does not use this, arguments and is not called with new, then yes.

// 1. Arrow functions capture the 'this' and 'arguments' binding from their lexical scope (i.e. when the arrow function is defined)
// 2. Arrow functions cannot be called with 'new'. ES2015 distinguishes between functions that are callable and functions that are constructable. (i.e. X() or 'new X()').

const personClone = new Person(person.name, person.age, person.education);
personClone.sayHello();

const expressivePersonClone = new PersonExpression(person.name, person.age, person.education);
expressivePersonClone.sayHello();
expressivePersonClone.sayHelloWithArrow();
