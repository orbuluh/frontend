# Closure

- From: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

## Basics

- You may nest a function within another function. The nested (inner) function is private to its containing (outer) function. The nested function also forms a **closure**.
  - A closure is **an expression (most commonly, a function) that can have free variables together with an environment that binds those variables (that "closes" the expression)**.

- Functions defined in the outer function will live longer than the duration of the outer function execution, if the inner function manages to survive beyond the life of the outer function. A closure is created when the inner function is somehow made available to any scope outside the outer function. (Like example below, when we return the `inside` out of `outside`)

- Consider below. Notice how `x` is preserved when `inside` is returned.
  - A closure must preserve **the arguments and variables in all scopes it references.**
  - Since each call provides potentially different arguments, a new closure is created for each call to outside. **The memory can be freed only when the returned inside is no longer accessible.**
  - This is not different from storing references in other objects, but is often less obvious because one does not set the references directly and cannot inspect them.

```js
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
const fnInside = outside(3); // so x is bind to 3 in inside
                             // and inside(y) always return 3 + y
const result = fnInside(5); // returns 8
const result1 = outside(3)(5); // returns 8
```

- Functions can be multiply-nested. The below example can be done because:
  - B forms a closure including A (i.e., B can access A's arguments and variables).
  - C forms a closure including B.
  - Because C's closure includes B and B's closure includes A, then C's closure also includes A. This means C can access both B and A's arguments and variables.
  - In other words, C chains the scopes of B and A, in that order.
  - The reverse, however, is not true. A cannot access C, because A cannot access any argument or variable of B, which C is a variable of. Thus, C remains private to only B.

```js
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // Logs 6 (which is 1 + 2 + 3), e.g. C accesses B's y and A's x.
```

- The inner variables of the inner functions act as safe stores for the outer arguments and variables. They hold "persistent" and "encapsulated" data for the inner functions to work with. The functions do not even have to be assigned to a variable, or have a name. So we can use this mechanism to do below:

```js
const getCode = (function () {
  const apiCode = "0]Eal(eh&2"; // A code we do not want outsiders to be able to modify…

  return function () {
    return apiCode;
  };
})();

getCode(); // Returns the apiCode
```

## Name conflict

- When two arguments or variables in the scopes of a closure have the same name, there is a name conflict.
- More nested scopes take precedence. So, the innermost scope takes the highest precedence, while the outermost scope takes the lowest. This is the **scope chain**. The first on the chain is the innermost scope, and the last is the outermost scope.
- If an enclosed function defines a variable with the same name as a variable in the outer scope, then **there is no way to refer to the variable in the outer scope again.** (The inner scope variable "overrides" the outer one, until the program exits the inner scope. It can be thought of as a name conflict.)

```js
function outside() {
  const x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

outside()(10); // returns 20 instead of 10
```
