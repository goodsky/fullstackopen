// JavaScript has several nifty ways to destructure arrays and objects!

// Arrays -------------------------------------------------------------
const a = [ 1, 2, 'three'];

const [a0, a1, a2, a3] = a;
console.log(a0);
console.log(a1);
console.log(a2);
console.log(a3);

// using arrow function
const useFirstThreeElements = ([firstElement, secondElement, thirdElement, ...remainder]) => {
    console.log(`FirstElement: ${firstElement}`);
    console.log(`SecondElement: ${secondElement}`);
    console.log(`ThirdElement: ${thirdElement}`);
    console.log(`Remaining Elements: ${remainder}`);
}

useFirstThreeElements([1, 2, 3, 4, 5, 6]);
useFirstThreeElements([1, 2]);

// Objects ----------------------------------------------------------------
const person = {
    name: 'Skyler',
    age: 30,
};

const { name, age, foo } = person;
console.log(name); // Skyler
console.log(age); // 30
console.log(foo); // undefined

// using function expression
const printObject = function({ name, age }) {
    console.log(name);
    console.log(age);
}

printObject(person);


const nestedPerson = {
    name: {
        first: 'Skyler',
        last: 'Goodell',
    },
    skills: {
        csharp: {
            years: 9,
        },
        java: {
            years: 13,
        },
        breathing: {
            years: 30,
        },
    }
};

// You can nest into an object using colons. 
// This is the same syntax for 'renaming' a field while destructuring.
const { skills: { breathing: { years: breathingYears }}} = nestedPerson;
console.log(`I have been breathing for ${breathingYears} years`);