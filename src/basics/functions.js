// This is how I usually think about defining a function.
function myFunction(a, b) {
    let sum = a + b;
    console.log(`${a} + ${b} = ${sum}`);
    return sum;
}

myFunction(1, 2);

// But is my function reference any different than a function variable?
// Answer: Nope. It's just a variable with a function stored in it.
myFunction = `Now I'm not a function!`;

// myFunction(1, 2); // TypeError: myFunction is not a function
console.log(myFunction);

// So this is the same as above --------------------------------
// NB: BUT NOT ACTUALLY THE SAME... it just works for my limited sample here!
// NB: Read more about declaration vs expression vs arrow. Learn  about:
//  hoisting
//  binding for 'this' and 'arguments'
//  callable vs constructable!

myFunction = (a, b) => {
    let sum = a + b;
    console.log(`${a} + ${b} = ${sum}`);
    return sum;
}

myFunction(1, 2);

// Declarations vs Expressions ---------------------------------

// Declarations are hoisted!
myFuncDeclaration();

// Expressions are not!
// myFuncExpression(); // TypeError: myFuncExpression is not a function
// myFuncArrowExpression(); // TypeError: myFuncArrowExpression is not a function

// This is a Function Declaration
function myFuncDeclaration() {
    console.log('This is a function declaration!');
}

// This is a Function Expression
var myFuncExpression = function() {
    console.log('This is a function expression!');
}

// This is a Function Expression... using the arrow syntax
var myFuncArrowExpression = () => {
    console.log('This is a function expression using arrows!');
};

// They can be invoked
myFuncDeclaration();
myFuncExpression();
myFuncArrowExpression()

