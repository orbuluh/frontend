# Object

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Basics

The `Object` type represents one of JavaScript's data types. It is used to store various keyed collections and more complex entities.

- A typical object inherits properties (including methods) from `Object.prototype`, although these properties may be shadowed (a.k.a. `overridden`).
- The only objects that don't inherit from `Object.prototype` are those with `null` prototype, or descended from other `null` prototype objects.
- Changes to the `Object.prototype` object are seen by **all objects through prototype chaining**, unless the properties and methods subject to those changes are `overridden` further along the prototype chain.
  - This provides a very powerful although potentially dangerous mechanism to override or extend object behavior.
  - To make it more secure, `Object.prototype` is the only object in the core JavaScript language that has **immutable prototype** — the prototype of `Object.prototype` is always null and not changeable.
- You should avoid calling any `Object.prototype` method, especially those that are not intended to be polymorphic
  - All objects descending from `Object.prototype` may define a custom own property that has the same name, but with entirely different semantics from what you expect.
  - Furthermore, these properties are not inherited by `null-prototype` objects.


## Use modern JavaScript `static` utilities for working with objects

- `valueOf()`, `toString()`, and `toLocaleString()` exist to be polymorphic and you should expect the object to define its own implementation with sensible behaviors, so you can call them as instance methods.
  - However, valueOf() and toString() are usually implicitly called through type conversion and you don't need to call them yourself in your code.
- `__defineGetter__()`, `__defineSetter__()`, `__lookupGetter__()`, and `__lookupSetter__()` are deprecated and should not be used.
  - Use the `static` alternatives `Object.defineProperty()` and `Object.getOwnPropertyDescriptor()` instead.
- The `__proto__` property is deprecated and should not be used.
  - The `Object.getPrototypeOf()` and `Object.setPrototypeOf()` alternatives are `static` methods.
- The `propertyIsEnumerable()` and `hasOwnProperty()` methods
  - can be replaced with the `Object.getOwnPropertyDescriptor()` and `Object.hasOwn()` `static` methods, respectively.
- The `isPrototypeOf()` method
  - can usually be replaced with `instanceof`, if you are checking the prototype property of a constructor.

- In case where a semantically equivalent static method doesn't exist, or if you really want to use the `Object.prototype` method, you should directly `call()` the `Object.prototype` method on your target object instead, to prevent the object from having an overriding property that produces unexpected results.

```js
const obj = {
  foo: 1,
  // You should not define such a method on your own object,
  // but you may not be able to prevent it from happening ... say we really do
  propertyIsEnumerable() {
    return false;
  },
};

obj.propertyIsEnumerable("foo"); // false; unexpected result
Object.prototype.propertyIsEnumerable.call(obj, "foo"); // true; expected result
```

- There isn't any method in an Object itself to delete its own properties (such as `Map.prototype.delete()`). To do so, one must use the `delete` operator.

## `null`-prototype objects (TODO: find more resource)

```js
const obj = Object.create(null);
const obj2 = { __proto__: null };
```

- you may create `null`-prototype objects using `Object.create(null)` or the object initializer syntax with `__proto__: null`
  - (note: the `__proto__` key in object literals is different from the deprecated `Object.prototype.__proto__` property).
- You can also **change the prototype of an existing object to `null`** by calling `Object.setPrototypeOf(obj, null)`.
- An object with a null prototype can behave in unexpected ways, because it doesn't inherit any object methods from `Object.prototype`.

```js
const normalObj = {}; // create a normal object
const nullProtoObj = Object.create(null); // create an object with "null" prototype

console.log(`normalObj is: ${normalObj}`); // shows "normalObj is: [object Object]"
console.log(`nullProtoObj is: ${nullProtoObj}`); // throws error: Cannot convert object to primitive value

alert(normalObj); // shows [object Object]
alert(nullProtoObj); // throws error: Cannot convert object to primitive value

normalObj.valueOf(); // shows {}
nullProtoObj.valueOf(); // throws error: nullProtoObj.valueOf is not a function

normalObj.hasOwnProperty("p"); // shows "true"
nullProtoObj.hasOwnProperty("p"); // throws error: nullProtoObj.hasOwnProperty is not a function

normalObj.constructor; // shows "Object() { [native code] }"
nullProtoObj.constructor; // shows "undefined"
```

- We can add the toString method back to the `null`-prototype object by assigning it one
  - Unlike normal objects, in which `toString()` is on the object's prototype, the `toString()` method here is an own property of `nullProtoObj`. This is because `nullProtoObj` has no (`null`) prototype.

```js
nullProtoObj.toString = Object.prototype.toString; // since new object lacks toString, add the original generic one back

console.log(nullProtoObj.toString()); // shows "[object Object]"
console.log(`nullProtoObj is: ${nullProtoObj}`); // shows "nullProtoObj is: [object Object]"
```

- In practice, objects with `null` prototype are usually used as a cheap substitute for `map`s. The presence of `Object.prototype` properties will cause some bugs:

```js
const ages = { alice: 18, bob: 27 };

function hasPerson(name) {
  return name in ages;
}

function getAge(name) {
  return ages[name];
}

hasPerson("hasOwnProperty"); // true           ....!!??
getAge("toString"); // [Function: toString]    ....!!??
```

- Using a `null`-prototype object removes this hazard without introducing too much complexity to the `hasPerson` and `getAge` functions:

```js
const ages = Object.create(null, {
  alice: { value: 18, enumerable: true },
  bob: { value: 27, enumerable: true },
});

hasPerson("hasOwnProperty"); // false  ... alright expected
getAge("toString"); // undefined       ... alright expected
```

- In such case, the addition of any method should be done cautiously, as they can be confused with the other key-value pairs stored as data.
- Making your object not inherit from Object.prototype also prevents **prototype pollution attacks**. If a malicious script adds a property to `Object.prototype`, it will be accessible on every object in your program, **except objects that have `null` prototype**.

```js
const user = {};

// A malicious script:
Object.prototype.authenticated = true;

// Unexpectedly allowing unauthenticated user to pass through
if (user.authenticated) {
  // access confidential data
}
```

- JavaScript also has built-in APIs that produce `null`-prototype objects, especially those that use objects as ad hoc key-value collections.
  - The return value of `Array.prototype.group()`
  - The groups and indices.groups properties of the result of `RegExp.prototype.exec()`
  - `Array.prototype[@@unscopables]` (all `@@unscopables` objects should have `null`-prototype)
  - `import.meta`
  - Module namespace objects, obtained through `import * as ns from "module";` or `import()`
- The term "`null`-prototype object" often also includes **any object without `Object.prototype` in its prototype chain**. Such objects can be created with `extends null` when using classes.

## Object coercion

- Object coercion, also known as **type coercion** or **implicit type conversion**, is a feature of JavaScript that allows **values of one data type to be converted to another data type automatically, depending on the context in which they are used.**
- This happens when the JavaScript engine expects a value of a certain data type but receives a value of a different data type.
  - Object coercion can be useful in some cases, as it allows you to write more concise and readable code. However, it can also lead to unexpected results if you're not careful.
  - You can also use explicit type conversion methods, such as `parseInt()` or `parseFloat()`, to ensure that your code behaves as expected.

```js
const x = 5;
const y = "10";
const z = x + y; // z will be "510"
```

Many built-in operations that expect objects first coerce their arguments to objects. The operation can be summarized as follows:

- Objects are returned as-is.
- undefined and null throw a TypeError.
- Number, String, Boolean, Symbol, BigInt primitives are wrapped into their corresponding object wrappers.

The best way to achieve the same effect in JavaScript is through the `Object()` constructor.

- `Object(x)` converts `x` to an object, and for undefined or null, it returns a plain object instead of throwing a TypeError.

