# Destructing assignment

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

The destructuring assignment syntax is a JavaScript expression that makes it possible to **unpack values from arrays, or properties from objects, into distinct variables.**

- The destructuring assignment define what values to unpack from the sourced variable uses on the left-hand side.

```js
const x = [1, 2, 3, 4, 5];
const [y, z] = x;
console.log(y); // 1
console.log(z); // 2
```

- Similarly, you can destructure objects on the left-hand side of the assignment.

```js
const obj = { a: 1, b: 2 };
const { a, b } = obj;
// is equivalent to:
// const a = obj.a;
// const b = obj.b;
```

## Binding and assignment

- For both object and array destructuring, there are two kinds of destructuring patterns: **binding pattern and assignment pattern**, with slightly different syntaxes.
- In binding patterns, the pattern starts with a declaration keyword (var, let, or const). Then, each individual property must either be bound to a variable or further destructured.

```js
const obj = { a: 1, b: { c: 2 } };
const {
  a,
  b: { c: d },
} = obj;
// Two variables are bound: `a` and `d`
```

- All variables share the same declaration, so if you want some variables to be re-assignable but others to be read-only, you may have to destructure twice — once with `let`, once with `const`.


```js
const obj = { a: 1, b: { c: 2 } };
const { a } = obj; // a is constant
let {
  b: { c: d },
} = obj; // d is re-assignable
```

- In assignment patterns, the pattern does not start with a keyword.
  - Each destructured property is assigned to a target of assignment — which may either be declared beforehand with `var` or `let`,
  - or is a property of another object — in general, anything that can appear on the left-hand side of an assignment expression.

```js
const numbers = [];
const obj = { a: 1, b: 2 };
({ a: numbers[0], b: numbers[1] } = obj);
// The properties `a` and `b` are assigned to properties of `numbers`
// You can't remove the surrounding parentheses, e.g. below isn't valid
// const { a: numbers[0], b: numbers[1] } = obj;
```

- Note: The parentheses ( ... ) around the assignment statement are required when using **object literal destructuring assignment without a declaration**.
  - `{ a, b } = { a: 1, b: 2 }` is not valid stand-alone syntax, as the `{a, b}` on the left-hand side is considered a block and not an object literal.
  - However, `({ a, b } = { a: 1, b: 2 })` is valid, as is `const { a, b } = { a: 1, b: 2 }`.

- If your coding style does not include trailing semicolons, the ( ... ) expression needs to be preceded by a semicolon, or it may be used to execute a function on the previous line.


## Default value

- Each destructured property can have a default value. The default value is used when the property is not present, or has value `undefined`. It is not used if the property has value `null`.

```js
const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

- The default value can be any expression. It will only be evaluated when necessary.

```js
const { b = console.log("hey") } = { b: 2 };
// Does not log anything, because `b` is defined and there's no need
// to evaluate the default value.
```

## Rest property

- You can end a destructuring pattern with a rest property ...rest.
- This pattern will store all remaining properties of the object or array into a new object or array.
- The rest property must be the last in the pattern, and must not have a trailing comma.


```js
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(others); // { b: 2, c: 3 }

const [first, ...others2] = [1, 2, 3];
console.log(others2); // [2, 3]

// const [a, ...b,] = [1, 2, 3];
// SyntaxError: rest element may not have a trailing comma
// Always consider using rest operator as the last element
```

## Example

```js
// basic usage
const foo = ["one", "two", "three"];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

```js
// If the number of variables specified on the left-hand side is more than
// right-hand side, the values of the remaining variables will be undefined.
const foo = ["one", "two"];

const [red, yellow, green, blue] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // undefined
console.log(blue); // undefined
```

```js
// can be used to swap variables
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1, 3, 2]
```

```js
// Destructuring can make working with an array return value more concise.
function f() {
  return [1, 2];
}

const [a, b] = f();
console.log(a); // 1
console.log(b); // 2
```

```js
// You can ignore return values that you're not interested in:
function f() {
  return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); // 1
console.log(b); // 3

const [c] = f();
console.log(c); // 1

[, ,] = f(); // ignored all
```

```js
// The rest property of array destructuring assignment can be another array or
// object binding pattern.

// Destructuring assignment pattern captures the remaining elements of the array
// as an object with two properties pop and push. So The remaining elements of
// the array are collected into an object with properties pop and push, which
// are extracted into variables of the same names.

const [a, b, ...{ pop, push }] = [1, 2];
console.log(a, b); // 1 2
console.log(pop, push); // [Function pop] [Function push]


// The rest property of array destructuring assignment can be another array or
// object binding pattern.
const [a, b, ...[c, d]] = [1, 2, 3, 4];
console.log(a, b, c, d); // 1 2 3 4

// These binding patterns can even be nested, as long as each rest property is
// the last in the list.

const [a, b, ...[c, d, ...[e, f]]] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c, d, e, f); // 1 2 3 4 5 6
```

```js
// When the regular expression exec() method finds a match, it returns an array
// containing first the entire matched portion of the string and then the
// portions of the string that matched each parenthesized group in the regular
// expression.
const [, protocol, fullhost, fullpath] = /^(\w+):\/\/([^/]+)\/(.*)$/.exec(url);
```

```js
// Array destructuring calls the iterable protocol of the right-hand side.
// Therefore, any iterable, not necessarily arrays, can be destructured.
const [a, b] = new Map([
  [1, 2],
  [3, 4],
]);
console.log(a, b); // [1, 2] [3, 4]

const obj = { 0: "a", 1: "b", length: 2 };
const [a, b] = obj;
// TypeError: obj is not iterable
```


```js
// Basic object destruction
const user = {
  id: 42,
  isVerified: true,
};

const { id, isVerified } = user;
console.log(id); // 42
console.log(isVerified); // true
```

```js
// A property can be unpacked from an object and assigned to a variable with a
// different name than the object property.
const o = { p: 42, q: true };
const { p: foo, q: bar } = o;

console.log(foo); // 42
console.log(bar); // true
```


```js
// Assigning to new variable names and providing default values
// A property can be both
//   - Unpacked from an object and assigned to a variable with a different name.
//   - Assigned a default value in case the unpacked value is undefined.
const { a: aa = 10, b: bb = 5 } = { a: 3 };

console.log(aa); // 3
console.log(bb); // 5  (b is undefined, bb fall back to 5)
```

```js
// Objects passed into function parameters can also be unpacked into variables
// the destructuring syntax allows for the new variable to have the same name or
// a different name than the original property, and to assign default values for
// the case when the original object does not define the property.

const user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "Jane",
    lastName: "Doe",
  },
};

function userId({ id }) {
  return id;
}

console.log(userId(user)); // 42


// You can define the name of the unpacked variable. Here we unpack the property
// named displayName, and rename it to dname for use within the function body.
function userDisplayName({ displayName: dname }) {
  return dname; // not return displayName as we reassigned it as dname
}

console.log(userDisplayName(user)); // `jdoe`

// Nested objects can also be unpacked.
function whois({ displayName, fullName: { firstName: name } }) {
  return `${displayName} is ${name}`;
}

console.log(whois(user)); // "jdoe is Jane"

```

```js
const people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith",
    },
    age: 35,
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones",
    },
    age: 25,
  },
];

for (const {
  name: n,
  family: { father: f },
} of people) {
  console.log(`Name: ${n}, Father: ${f}`);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```

```js
const key = "z";
// Computed property names, like on object literals, can be used with destructuring.
const { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"
```

```js
// Array and Object destructuring can be combined.
const props = [
  { id: 1, name: "Fizz" },
  { id: 2, name: "Buzz" },
  { id: 3, name: "FizzBuzz" },
];

const [, , { name }] = props;

console.log(name); // "FizzBuzz"
```

```js
// The prototype chain is looked up when the object is deconstructed
const obj = {
  self: "123",
  __proto__: {
    prot: "456",
  },
};
const { self, prot } = obj;
// self "123"
// prot "456" (Access to the prototype chain)
```