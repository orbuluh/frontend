# Functions

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

## Concept: Non/Primitive data types

- From: [scaler post](https://www.scaler.com/topics/javascript/pass-by-value-and-pass-by-reference/)
- Primitive data types such as **string, number, null, undefined, and boolean**, are **passed by value**
- Non-primitive data types such as **objects, arrays, and functions** are **passed by reference**.
- The main difference between primitives & non-primitives is that primitives are immutable i.e. there is no way to change a primitive value once it gets created, whereas non-primitives are mutable
- Primitive data types are compared by value. If two values are the same, then they are strictly equal.
- Non-primitive data types are not compared by value. That means even if two objects and arrays have the same values and properties or the same elements, respectively, they are not strictly equal. They are compared by reference.
- In JavaScript, primitive values are stored on the stack, while non-primitive values are stored in a heap.

## Functions basics

```js
function square(number) {
  return number * number;
}

// or define as function expression like:

const square = function (number) {
  return number * number;
};

// a name can be provided with a function expression. Providing a name allows
// the function to refer to itself, and also makes it easier to identify the
// function in a debugger's stack traces:
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};

console.log(factorial(3));
```

- Function expressions are convenient when passing a function as an argument to another function.

```js
function apply(fnc, arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = fnc(arr[i]);
  }
}
```

- A function can be defined based on a condition

```js
let myFunc;
if (num === 0) {
  myFunc = function (theObject) {
    theObject.make = "Toyota";
  };
} else {
  myFunc = function (theObject) {
    theObject.make = "BMW";
  };
}
```

- In addition to defining functions as described here, you can also use the `Function` constructor to create functions from a string at runtime, much like `eval()`.




## Default parameter

- In the past, the general strategy for setting defaults was to test parameter values in the body of the function and assign a value if they are `"undefined"`.

```js
function multiply(a, b) {
  b = typeof b !== "undefined" ? b : 1;
  return a * b;
}

multiply(5); // 5
```

- With default parameters, a manual check in the function body is no longer necessary.

```js
function multiply(a, b = 1) {
  return a * b;
}

multiply(5); // 5
```

## Scope of function and concept of "hoist"

-  The scope of a function declaration is the function **in which it is declared** (or the entire program, if it is declared at the top level).
- Functions must be in scope when they are called, but the function declaration can be **hoisted**. For example:

```js
console.log(square(5)); // 25

function square(n) {
  return n * n;
}
```

- Above is called "**hoisted**": the `square()` function being called before it's declared.
- **The JavaScript interpreter hoists the entire function declaration to the top of the current scope**, so the code above is equivalent to:

```js
// All function declarations are effectively at the top of the scope
function square(n) {
  return n * n;
}

console.log(square(5)); // 25
```

- Note that function hoisting only works with function declarations — not with function expressions. The code below will not work.

```js
console.log(square); // ReferenceError: Cannot access 'square' before initialization
const square = function (n) {
  return n * n;
};
```

- Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function.
- However, a function **can access all variables and functions defined inside the scope in which it is defined.** In other words,
  - A function defined in the global scope can access all variables defined in the global scope.
  - A function defined inside another function can also access all variables defined in its parent function, and any other variables to which the parent function has access.

- There are three ways for a function to refer to itself:

```js
const foo = function bar() {
  // Within the function body, the following are all equivalent:
  //
  // bar();
  // arguments.callee();
  // foo();
};
```

## [Closure](closure.md)

## Issue of `this`

- Until arrow functions (described below), **every new function defined its own `this` value**
- (a new object in the case of a constructor, undefined in strict mode function calls, the base object if the function is called as an "object method", etc.).
- This proved to be less than ideal with an object-oriented style of programming.

```js
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

const p = new Person();
```

- In ECMAScript 3/5, this issue was fixed by assigning the value in this to a variable that could be closed over.

```js
function Person() {
  // Some choose `that` instead of `self`.
  // Choose one and be consistent.
  const self = this;
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;
  }, 1000);
}
```

- Alternatively, a bound function, expressed with arrow function, could be created so that the proper `this` value would be passed.

## Arrow Functions

- An arrow function expression (also called a **fat arrow**) has a shorter syntax compared to function expressions and does **not** have its own `this`, `arguments`, `super`, or `new.target`.
- Arrow functions are always anonymous.


```js
const a = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
const a3 = a.map((s) => s.length);
console.log(a3); // [8, 6, 7, 9]
```

- Continue on previous section about `this`. Using bound function to pass `this` looks like:

```js
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // `this` properly refers to the person object
  }, 1000);
}

const p = new Person();
```
