# `this`

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)


## Basics

- In most cases, the value of `this` is determined by **how a function is called (runtime binding)**. It can't be set by assignment during execution, and it may be different each time the function is called.
- The `bind()` method can set the value of a function's `this` regardless of how it's called, and arrow functions don't provide their own `this` binding (it retains the `this` value of the enclosing lexical context).
- The value of this depends on in which context it appears: function, class, or global.


## `this` in context of function

Inside a function, the value of this depends on how the function is called.

- Think about `this` as a hidden parameter of a function — just like the parameters declared in the function definition, `this` is a binding that the language creates for you when the function body is evaluated.
- For a typical function, the value of `this` is the object that the function is accessed on.

```js
function getThis() {
  return this; // which "this" is determined by the context
}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

// same function assign to different obj*.getThis
obj1.callGetThis = getThis;
obj2.callGetThis = getThis;

// but the returned "this" pointing to different object
console.log(obj1.callGetThis()); // { name: 'obj1', callGetThis: [Function: getThis] }
console.log(obj2.callGetThis()); // { name: 'obj2', callGetThis: [Function: getThis] }

// Note how the function is the same, but based on how it's invoked, the value
// of `this` is different. This is analogous to how function parameters work.
```

- The value of `this` is **not the object that has the function as an own property**, but **the object that is used to call the function**.

```js
const obj3 = {
  __proto__: obj1,
  name: "obj3",
};

// note - not obj1, `this` refers to the object that is used to call the function
console.log(obj3.getThis()); // { name: 'obj3' }
```

- The value of this always changes based on how a function is called, even when the function was defined on an object at creation:

```js
const obj4 = {
  name: "obj4",
  getThis() {
    return this;  // created while creation
  },
};

const obj5 = { name: "obj5" };

obj5.getThis = obj4.getThis;
console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }

// note, not obj4, even the getThis is decided while obj4 construction
```

- If the value that the method is accessed on is a primitive, this will be a primitive value as well — but only if the function is in strict mode.

```js
function getThisStrict() {
  "use strict"; // Enter strict mode
  return this;
}

// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThisStrict = getThisStrict;
Number.prototype.getThisNoStrict = getThis;
console.log(typeof(1).getThisStrict()); // "number"
console.log(typeof(1).getThisNoStrict()); // "object"
```

- If the function is called without being accessed on anything, this will be undefined — but only if the function is in strict mode.

```js
console.log(typeof getThisStrict()); // "undefined"
console.log(typeof getThisNoStrict()); // ReferenceError: getThisNoStrict is not define
```

- In non-strict mode, a special process called this substitution ensures that the value of this is always an object. This means:
- If a function is called with this set to undefined or null, this gets substituted with `globalThis`.
- If the function is called with this set to a primitive value, this gets substituted with the primitive value's wrapper object.

```js
function getThis() {
  return this;
}

// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThis = getThis;
console.log(typeof (1).getThis()); // "object"
console.log(getThis() === globalThis); // true
```

- In typical function calls, `this` is implicitly passed like a parameter through the function's prefix.
- You can also explicitly set the value of this using the `Function.prototype.call()`, `Function.prototype.apply()`, or `Reflect.apply()` methods.
- Using `Function.prototype.bind()`, you can create a new function with a specific value of `this` that doesn't change regardless of how the function is called.
- When using these methods, the this substitution rules above still apply if the function is non-strict.

## `this` in context of callbacks

When a function is passed as a callback, the value of `this` depends on how the callback is called, which is determined by the implementor of the API.

- Callbacks are typically called with a `this` value of undefined (calling it directly without attaching it to any object), which means if the function is non–strict, the value of this is the global object (`globalThis`).
- This is the case for iterative array methods, the `Promise()` constructor, etc.

```js
function logThis() {
  "use strict";
  console.log(this);
}

[1, 2, 3].forEach(logThis); // undefined, undefined, undefined
```

- Some APIs allow you to set a `this` value for invocations of the callback.
  - For example, all iterative array methods and related ones like `Set.prototype.forEach()` accept an optional `thisArg` parameter.

```js
[1, 2, 3].forEach(logThis, { name: "obj" });
// { name: 'obj' }, { name: 'obj' }, { name: 'obj' }
```

- Occasionally, a callback is called with a `this` value other than `undefined`. For example, the reviver parameter of `JSON.parse()` and the replacer parameter of `JSON.stringify()` are both called with `this` set to the object that the property being parsed/serialized belongs to.


## `this` in context of arrow functions

In arrow functions, `this` retains the value of the enclosing lexical context's `this`. In other words, when evaluating an arrow function's body, the language does not create a new `this` binding.

For example, in global code, `this` is always `globalThis` regardless of strictness, because of the global context binding:

```js
const globalObject = this;
const foo = () => this; // in next snippet, no matter how foo is called, the this
                        // it returns always return the globalThis, as it's what
                        // it was when the arrow function foo was defined.
console.log(foo() === globalObject); // true
```

- Arrow functions create a closure over the `this` value of its surrounding scope, which means **arrow functions behave as if they are "auto-bound"** — **no matter how it's invoked, `this` is set to what it was when the function was created** (in the example above, the global object).
- The same applies to arrow functions created inside other functions: their `this` remains that of the enclosing lexical context.
- Furthermore, when invoking arrow functions using `call()`, `bind()`, or `apply()`, the `thisArg` parameter is ignored. You can still pass other arguments using these methods, though.

```js
const obj = { name: "obj" };

// Attempt to set this using call - but the this foo returned is still globalThis
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind - but the this foo returned is still globalThis
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalObject); // true
```

## `this` in context of constructor

- When a function is used as a constructor (with the `new` keyword), its `this` is bound to the new object being constructed, **no matter which object the constructor function is accessed on.**
- The value of `this` becomes the value of the new expression unless the constructor returns another non–primitive value.


```js
function C() {
  this.a = 37;
}

let o = new C();
console.log(o.a); // 37

function C2() {
  this.a = 37;
  return { a: 38 };
}

o = new C2();
console.log(o.a); // 38

// In the second example (C2), because an object was returned during
// construction, the new object that this was bound to gets discarded.
// (This essentially makes the statement this.a = 37; dead code. It's not
//  exactly dead because it gets executed, but it can be eliminated with
//  no outside effects.)
```

## `this` in context of `super`

- When a function is invoked in the `super.method()` form, the `this` inside the method function is the same value as the `this` value around the `super.method()` call, and is generally not equal to the object that `super` refers to.
- This is because `super.method` is not an object member access like the ones above — it's a special syntax with different binding rules. For examples, see the [super reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#calling_methods_from_super).


## `this` is different in static/instance context of class

A class can be split into two contexts: **static** and **instance**.

- Constructors, methods, and instance field initializers (public or private) belong to the **instance** context.
- Static methods, static field initializers, and static initialization blocks belong to the **static** context. The `this` value is different in each context.

Class constructors are always called with `new`, so their behavior is the same as function constructors:

- the `this` value is the new instance being created.

Class methods behave like methods in object literals — the `this` value is the object that the method was accessed on.
- If the method is not transferred to another object, `this` is generally an instance of the class.

Static methods are not properties of `this`. They are **properties of the class itself**.

- Therefore, they are generally accessed on the class, and `this` is the value of **the class (or a subclass)**.
- Static initialization blocks are also evaluated with `this` set to the current class.

Field initializers are also evaluated in the context of the class.

- Instance fields are evaluated with `this` set to the **instance** being constructed.
- Static fields are evaluated with `this` set to the current **class**. This is why arrow functions in field initializers are bound to the class.

```js
class C {
  instanceField = this;
  static staticField = this;
}

const c = new C();
console.log(c.instanceField === c); // true
console.log(C.staticField === C); // true
```

## `this` in context of Derived class constructor

- Unlike base class constructors, **derived constructors have no initial `this` binding**.
- Calling `super()` creates a `this` binding within the constructor and essentially has the effect of evaluating the following line of code, where `Base` is the base class:

```js
this = new Base();
```

- Derived classes must not return before calling `super()`, unless the constructor returns an object (so the `this` value is overridden) or the class has no constructor at all.


```js
class Base {}
class Good extends Base {}
class AlsoGood extends Base {
  constructor() {
    return { a: 5 };
  }
}
class Bad extends Base {
  constructor() {}
}

new Good();
new AlsoGood();
new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

## `this` in the context of global

In the global execution context (outside of any functions or classes; may be inside blocks or arrow functions defined in the global scope), the `this` value depends on **what execution context the script runs in**.

- Like callbacks, the `this` value is determined by the runtime environment (the caller).
- At the top level of a script, this refers to `globalThis` whether in strict mode or not. This is generally the same as the global object — for example, if the source is put inside an HTML `<script>` element and executed as a script, `this === window`.
- `globalThis` is generally the same concept as the global object (i.e. adding properties to `globalThis` makes them global variables)
  - this is the case for browsers and Node — but hosts are allowed to provide a different value for `globalThis` that's unrelated to the global object.

- If the source is loaded as a module (for HTML, this means adding type="module" to the `<script>` tag), this is always `undefined` at the top level.

- If the source is executed with `eval()`, this is the same as the enclosing context for direct `eval`, or `globalThis` (as if it's run in a separate global script) for indirect eval.

```js
function test() {
  // Direct eval
  console.log(eval("this") === this);
  // Indirect eval, non-strict
  console.log(eval?.("this") === globalThis);
  // Indirect eval, strict
  console.log(eval?.("'use strict'; this") === globalThis);
}

test.call({ name: "obj" }); // Logs 3 "true"
```

- Note that some source code, while looking like the global scope, is actually wrapped in a function when executed. For example,
  - Node.js `CommonJS` modules are wrapped in a function and executed with the `this` value set to `module.exports`.
  - Event handler attributes are executed with this set to the element they are attached to.
- Object literals don't create a `this` scope — only functions (methods) defined **within** the object do. Using `this` in an object literal inherits the value from the surrounding scope.

```js
const obj = {
  a: this,
};

console.log(obj.a === window); // true
```