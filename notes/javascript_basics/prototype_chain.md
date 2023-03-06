# Inheritance and the prototype chain

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

## Basics

JavaScript is different from class-based languages (like Java or C++)

- JavaScript is dynamic and does not have static types.
- When it comes to inheritance, JavaScript only has one construct: **objects**.

- Each object has a **private property** which **holds a link to another object** called its `prototype`.
- That `prototype` object has a prototype of its own, and so on until an object is reached with null as its `prototype`.
- **By definition, null has no `prototype`**, and acts as the final link in this prototype chain.
- It is **possible to mutate any member of the prototype chain or even swap out the prototype at runtime**, so **concepts like static dispatching do not exist in JavaScript.**


## The prototypical inheritance model / prototype chain

- `classes` model in JavaScript are actually built on top of a prototypical model
- JavaScript objects are **dynamic "bags" of properties** (referred to as own properties). JavaScript objects have a link to a `prototype` object.
- When trying to access a property of an object, the **property will not only be sought on the object but on the `prototype` of the object**, the `prototype` of the `prototype`, and so on **until either a property with a matching name is found or the end** of the `prototype` chain is reached.

```js
const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
  },
};

// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null. (end of the prototype chain)

// Thus, the full prototype chain looks like:
// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> Object.prototype ---> null

console.log(o.a); // 1
// Is there an 'a' own property on o? Yes, and its value is 1.

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing

console.log(o.c); // 4
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.

console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and
// there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.
```

### Method is just a property, witch follows the same inheritance rule

- JavaScript does not have "methods" in the form that class-based languages define them.
- In JavaScript, any function can be added to an object **in the form of a property**.
- An **inherited function acts just as any other property**, including property shadowing as shown above (in this case, a form of **method overriding**).

- When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property.

```js
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method()); // 3
// When calling parent.method in this case, 'this' refers to parent

// child is an object that inherits from parent
const child = {
  __proto__: parent,
};
console.log(child.method()); // 3
// When child.method is called, 'this' refers to child.
// So when child inherits the method of parent,
// The property 'value' is sought on child. However, since child
// doesn't have an own property called 'value', the property is
// found on the [[Prototype]], which is parent.value.

child.value = 4; // assign the value 4 to the property 'value' on child.
// This shadows the 'value' property on parent.
// The child object now looks like:
// { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method()); // 5
// Since child now has the 'value' property, 'this.value' means
// child.value instead
```

## JavaScript style of extracting common logic

From:

```js
const boxes = [
  { value: 1, getValue() { return this.value; } },
  { value: 2, getValue() { return this.value; } },
  { value: 3, getValue() { return this.value; } },
];
```

To:

```js
const boxPrototype = {
  getValue() {
    return this.value;
  },
};

const boxes = [
  { value: 1, __proto__: boxPrototype },
  { value: 2, __proto__: boxPrototype },
  { value: 3, __proto__: boxPrototype },
];
```

- This can be further simplified with constructor function
  - Constructors are functions called with `new`.
  - constructor function, which automatically sets the `[[Prototype]]` for every object manufactured.

```js
// A constructor function
function Box(value) {
  this.value = value;
}

// Properties all boxes created from the Box() constructor will have
// Box.prototype. Box.prototype is not much different from the boxPrototype
// object we created previously — it's just a plain object.
Box.prototype.getValue = function () {
  return this.value;
};
// Constructor.prototype by default has one own property: constructor, which
// references the constructor function itself — that is,
// Box.prototype.constructor === Box.
// This allows one to access the original constructor from any instance.

const boxes = [new Box(1), new Box(2), new Box(3)];
// Every instance created from a constructor function will automatically have
// the constructor's prototype property as its [[Prototype]] — that is,
// Object.getPrototypeOf(new Box()) === Box.prototype.
```

## `class`es are syntax sugar over constructor functions

- classes are designed to be an abstraction over the underlying prototype mechanism
- you can still manipulate Box.prototype to change the behavior of all instances
- The above constructor function can be rewritten in `classes` as:

```js
class Box {
  constructor(value) {
    this.value = value;
  }

  // Methods are created on Box.prototype
  getValue() {
    return this.value;
  }
}
```

- Because `Box.prototype` references the same object as the `[[Prototype]]` of all instances created by `new Box`, we can change the behavior of all instances by mutating `Box.prototype`.

```js
function Box(value) {
  this.value = value;
}
Box.prototype.getValue = function () {
  return this.value;
};
const box1 = new Box(1);
const box2 = new Box(2);

// Mutate Box.prototype through adding a method after instances have already
// been created - which just gives the method for all instances
Box.prototype.getValue = function () {
  return this.value + 1;
};
box1.getValue(); // 2
box2.getValue(); // 3
```

## Re-assigning `Constructor.prototype` (Constructor.prototype = ...) is a bad idea

- The `[[Prototype]]` of instances created before the reassignment is now referencing a different object from the `[[Prototype]]` of instances created after the reassignment — mutating one's `[[Prototype]]` no longer mutates the other.
- Unless you manually re-set the constructor property, the constructor function can no longer be traced from `instance.constructor`, which may break user expectation. Some built-in operations will read the constructor property as well, and if it is not set, they may not work as expected.
- `Constructor.prototype` is only useful when constructing instances. It has nothing to do with `Constructor.[[Prototype]]`, which is the constructor function's own prototype, which is `Function.prototype` — that is, `Object.getPrototypeOf(Constructor) === Function.prototype`


##　Implicit constructors of literals

- Some literal syntaxes in JavaScript create instances that implicitly set the `‵[[Prototype]]`

```js
// Object literals (without the `__proto__` key) automatically
// have `Object.prototype` as their `[[Prototype]]`
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true

// Array literals automatically have `Array.prototype` as their `[[Prototype]]`
const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true

// RegExp literals automatically have `RegExp.prototype` as their `[[Prototype]]`
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true

// We can "de-sugar" them into their constructor form.
const array = new Array(1, 2, 3);
const regexp = new RegExp("abc");
// For example, "array methods" like `map()` are simply methods defined on Array.prototype, which is why they are automatically available on all array instances.
```

## Some built-in constructors' prototype property are instances themselves

- Due to historical reason

```js
Number.prototype + 1; // 1 => Number.prototype is a number 0
Array.prototype.map((x) => x + 1); // [] => Array.prototype is an empty array
String.prototype + "a"; // "a" => String.prototype is an empty string
RegExp.prototype.source; // "(?:)" => RegExp.prototype is /(?:)/
Function.prototype(); // Function.prototype is a no-op function by itself
```

- This is not the case for user-defined constructors, nor for modern constructors like `Map`.

```js
Map.prototype.get(1);
// Uncaught TypeError: get method called on incompatible Map.prototype
```

## Building longer inheritance chains

- A typical constructor will build the following prototype chain:

```js
function Constructor() {}

const obj = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null
```

- To build longer prototype chains:

```js
function Base() {}
function Derived() {}
// Set the `[[Prototype]]` of `Derived.prototype`
// to `Base.prototype`
Object.setPrototypeOf(Derived.prototype, Base.prototype);

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

- In class terms, this is equivalent to using the extends syntax.

```js
class Base {}
class Derived extends Base {}

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

- Deprecated way to do the same thing (don't do it):

```js
function Base() {}
function Derived() {}
// Re-assigns `Derived.prototype` to a new object
// with `Base.prototype` as its `[[Prototype]]`
// DON'T DO THIS — use Object.setPrototypeOf to mutate it instead
Derived.prototype = Object.create(Base.prototype);
```

[TODO] - below this section hasn't read: [Inspecting prototypes: a deeper dive]
