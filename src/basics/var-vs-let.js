
// var used to be the only way of defining a new variable in JavaScript
console.log("var ---------------------------------------------------");
for (var vari = 0; vari < 10; vari++) {
    console.log(vari); // 0 ... 9
}

// var lives outside the 'block scope' of the for loop.
console.log(vari); // 10

// 'function scope' DOES exist
console.log("var in function ---------------------------------------");
function varInFunc() {
    for (var func_vari = 0; func_vari < 10; func_vari++) {
        console.log(func_vari);
    }
    console.log(func_vari);
}

varInFunc();
// console.log(func_vari); // ReferenceError: func_vari is not defined

// let respects the block scope!
console.log("let ---------------------------------------------------");
for (let leti = 0; leti < 10; leti++) {
    console.log(leti); // 0 ... 9
}

// let only lives within the block scope
// console.log(leti); // ReferenceError: leti is not defined

console.log("var and let ??? ---------------------------------------");
var i;
i = 34;
for (let i = 0; i < 4; i++) {
    console.log(i); // 0..3
}

// A var and a let defined with the same name function as different variables.
console.log(i); // 34

console.log("var and let (p2) ??? -----------------------------------");
let i2;
i2 = 34;
// for (var i2 = 0; i2 < 4; i2++) { // SyntaxError: Identifier 'i2' has already been declared
//    console.log(i2); // 0..3
// }

// A 
console.log(i2); // 34


// ----------------------------------------------------------------------
// Is hoisting different for var vs let?
// Yup. let does not allow unintuitive hoisting.

console.log(`var before assign: ${hoistedVar}`); // undefined
hoistedVar = 11;
console.log(`var after assign: ${hoistedVar}`); // 11
var hoistedVar = 42;
console.log(`var after declare: ${hoistedVar}`); // 42

// console.log(`var before assign: ${hoistedLet}`); // ReferenceError: Cannot access 'hoistedLet' before initialization
// hoistedLet = 11; // ReferenceError: Cannot access 'hoistedLet' before initialization
// console.log(`var after assign: ${hoistedLet}`); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = 42;
console.log(`let after declare: ${hoistedLet}`); // 42
