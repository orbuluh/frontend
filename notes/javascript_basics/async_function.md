# `async` function with `await`

- [mdn web docs 1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)


## Intro

- The `async` and `await` keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.
- `async` function return a `Promise` which will be resolved with the value returned by the async function, or rejected with an exception thrown from, or uncaught within, the `async` function.
  - `async` functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.

```js
async function foo() {
  return 1;
}
// will be something like:
function foo() {
  return Promise.resolve(1);
}
```

- Side note: Even though the return value of an `async` function behaves as if it's wrapped in a `Promise.resolve`, they are not equivalent. An `async` function will return a different reference, whereas `Promise.resolve` returns the same reference if the given value is a promise.

```js
const p = new Promise((res, rej) => {
  res(1);
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false
```

- The `async` function declaration declares an `async` function where **the `await` keyword is permitted within the function body.**
- Async functions can contain zero or more `await` expressions. `await` expressions make promise-returning functions behave **as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected.**
- The resolved value of the promise is treated as the return value of the `await` expression. Use of `async` and `await` enables the use of ordinary `try` / `catch` blocks around asynchronous code.
- The purpose of `async`/`await` is to **simplify the syntax necessary to consume promise-based APIs.** The behavior of async/await is similar to combining generators and promises.


- The body of an `async` function can be thought of as being split by zero or more `await` expressions.
- Top-level code, up to and including the first `await` expression (if there is one), is run synchronously.
  - In this way, an `async` function without an `await` expression will run synchronously.
  - If there is an `await` expression inside the function body, however, the async function will always complete asynchronously.

- These 2 functions are equivalent:
  - For the first function, the `await` keyword is used to pause the function execution until the `Promise` resolves. The function returns a `Promise` that resolves with the value undefined, because there is no explicit `return` statement.
  - In the second function, function `foo()`, a `Promise` is explicitly created using `Promise.resolve(1)`, which creates a `Promise` that immediately resolves with the value `1`. Then, the `then()` method is used to chain a callback function that returns `undefined`, effectively mimicking the behavior of the `async`/`await` syntax.
  - So, both functions have the same effect of pausing the execution until the `Promise` resolves with the value `1`, and returning a Promise that resolves with `undefined`. Therefore, they are considered equivalent in their behavior.

```js
async function foo() {
  await 1;
}
```

```js
function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```

- `async` function declarations are hoisted to the top of their scope and can be called anywhere in their scope.