const a = [1, -1, 3];

// mutable add
a.push(5);

console.log(`length: ${a.length}`);
console.log(`[1]: ${a[1]}`); // -1
console.log(`[-1]: ${a[-1]}`); // undefined
console.log(`[4]: ${a[4]}`); // undefined

// immutable concat (preferred in React)
const a2 = a.concat(-8);
console.log(`a.length: ${a.length} : a2.length: ${a2.length}`);

// function-based iteration
a.forEach(value => {
    console.log(value); // 1, -1, 3, 5
});

// function-based mapping
const m = a.map(value => `<li>${value}</li>`);
console.log(m);

// destructuring assignment
const [first, second, ...rest] = a;
console.log(first, second); // 1, -1
console.log(rest); // 3, 5