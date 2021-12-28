// Define a variable in the global scope:
const theName = "Oluwatobi Sofela";

// Define nested functions:
function getName() {
    const theName = "Brandon Scott";
    function inner1() {
        const theName = "Skyler Goodell";
        function inner2() {
            return theName;
        }
        return inner2();
    }
  return inner1();
}

// Scopes:
// inner2() -> inner1() -> getName() -> global
console.log(getName());

// -------------------------------------------------

// Lexical this and arguments ...
// Arrow functions bind the 'this' and 'arguments' properties in the lexical scope.
// This means, the 'this' and 'arguments' at the time of defining the arrow function is what will be used when executing the function.
// This is different from function expressions, which bind 'this' and 'arguments' at invocation.

function createObjectWithExpression() {
    console.log(`Inside 'createObject': ${this.foo}`);
    return {
        foo: 42,
        bar: function() {
            console.log(`Inside 'bar': ${this.foo}`);
        }
    }
}

// .call( X ) allows you to override the 'this' binding inside a method call
// The ctor function has foo = 21 during the constructing
// The bar function has foo = 42 since that is the value on the object itself
createObjectWithExpression.call({foo: 21}).bar();

function createObjectWithArrow() {
    console.log(`Inside 'createObject': ${this.foo}`);
    return {
        foo: 42,
        bar: () => { // Arrow function!
            console.log(`Inside 'bar': ${this.foo}`);
        }
    }
}

// The ctor function has foo = 21 during the constructing
// The bar function has foo = 21 as well!!! Due to the value of 'this' in the lexical scope of the arrow function.
createObjectWithArrow.call({foo: 21}).bar();


// ------------------------------------------------------
// hoisting... 
// all undeclared variables are 'global'
function myFunctionScope() {
    imUndeclared = 42;
    var imAVar = 42;
    let imALet = 42;
}

myFunctionScope();

console.log(imUndeclared);
console.log(typeof imAVar); // undefined
console.log(typeof imALet); // undefined