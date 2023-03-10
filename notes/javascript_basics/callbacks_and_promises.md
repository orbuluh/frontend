# Callbacks and promises

- [mdn web docs 1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [mdn web docs 2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [mdn web docs 3]()

## Using promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation. 

Since most people are consumers of already-created promises, this guide will explain consumption of returned promises before explaining how to create them.

- Essentially, a promise is **a returned object to which you attach callbacks, instead of passing callbacks into a function.**

- Imagine a function, `createAudioFileAsync()`, which asynchronously generates a sound file given a configuration record and two callback functions: one called if the audio file is successfully created, and the other called if an error occurs.

```js
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

- If `createAudioFileAsync()` were rewritten to return a promise, you would attach your callbacks to it instead:

```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```


## Advantages of using Promises: Chaining

- A common need is to execute **two or more asynchronous operations back to back**, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step.
- In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom:

```js
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(`Got the final result: ${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

- With promises, we accomplish this by creating a promise chain.
  - The API design of promises makes this great, because callbacks are attached to the returned promise object, instead of being passed into a function.
  - Here's the magic: the `then()` function returns a new promise
- The arguments to `then` are optional, and `catch(failureCallback)` is short for `then(null, failureCallback)` — so if your error handling code is the same for all steps, you can attach it to the end of the chain:

```js
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

- You might see this expressed with arrow functions instead:


```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

- Important: Always return results, otherwise callbacks won't catch the result of a previous promise 
  - (with arrow functions, `() => x` is short `for () => { return x; }`).
  - If the previous handler started a promise but did not return it, there's no way to track its settlement anymore, and the promise is said to be "floating".

```js
doSomething()
  .then((url) => {
    // I forgot to return this
    fetch(url);
  })
  .then((result) => {
    // result is undefined, because nothing is returned from
    // the previous handler.
    // There's no way to know the return value of the fetch()
    // call anymore, or whether it succeeded at all.
  });
```

- This may be worse if you have race conditions — if the promise from the last handler is not returned, the next then handler will be called early, and any value it reads may be incomplete.

```js
const listOfIngredients = [];

doSomething()
  .then((url) => {
    // I forgot to return this
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        listOfIngredients.push(data);
      });
  })
  .then(() => {
    console.log(listOfIngredients);
    // Always [], because the fetch request hasn't completed yet.
  });
```

- Therefore, as a rule of thumb, **whenever your operation encounters a promise, return it and defer its handling to the next then handler**.

```js
doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    listOfIngredients.push(data);
  })
  .then(() => {
    console.log(listOfIngredients);
  });
```

## Nesting

- Above can be rewritten as promise chain nested in the return value of another `then()` handler

```js
doSomething()
  .then((url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        listOfIngredients.push(data);
      }),
  )
  .then(() => {
    console.log(listOfIngredients);
  });

```

- Simple promise chains are best kept flat without nesting, as nesting can be a result of careless composition.
- Nesting is a control structure to limit the scope of catch statements. Specifically, a nested catch only catches failures in its scope and below, not errors higher up in the chain outside the nested scope.
- When used correctly, this gives greater precision in error recovery:

```js
doSomethingCritical()
  .then((result) =>
    doSomethingOptional(result)
      .then((optionalResult) => doSomethingExtraNice(optionalResult))
      .catch((e) => {}),
  ) // Ignore if optional stuff fails; proceed.
  .then(() => moreCriticalStuff())
  .catch((e) => console.error(`Critical failure: ${e.message}`));
```

- Note that the optional steps here are nested. The inner error-silencing catch handler only catches failures from `doSomethingOptional()` and `doSomethingExtraNice()`, after which the code resumes with `moreCriticalStuff()`.
- Importantly, if `doSomethingCritical()` fails, its error is caught by the final (outer) `catch` only, and does not get swallowed by the inner catch handler.

## Chaining after a catch

- It's possible to chain **after** a failure, i.e. a `catch`, which is useful to accomplish new actions even after an action failed in the chain. Read the following example:

```js
new Promise((resolve, reject) => {
  console.log("Initial");
  resolve();
})
  .then(() => {
    throw new Error("Something failed");
    console.log("Won't be displayed because above throw already");
  })
  .catch(() => {
    console.error("Catch error from above throw");
  })
  .then(() => {
    console.log("Do this, no matter what happened before");
  });
/* Output:
Initial
Catch error from above throw
Do this, no matter what happened before
*/
```

## Common mistakes of using Promise

```js
// Bad example!
doSomething()
  .then(function (result) {
    // Forgot to return promise from inner chain + unnecessary nesting
    doSomethingElse(result).then((newResult) => doThirdThing(newResult));
  })
  .then(() => doFourthThing());
// Forgot to terminate chain with a catch!
```

- The first mistake is to not chain things together properly.
  - This happens when we **create a new promise but forget to return it.**
  - As a consequence, the chain is broken — or rather, we have two independent chains racing.
  - This means `doFourthThing()` won't wait for `doSomethingElse()` or `doThirdThing()` to finish, and will run concurrently with them — which is likely unintended.
  - Separate chains also have separate error handling, leading to uncaught errors.

- The second mistake is to **nest unnecessaril**y, enabling the first mistake.
  - Nesting also limits the scope of inner error handlers, which—if unintended—can lead to uncaught errors.
  - A variant of this is **the promise constructor anti-pattern**, which combines nesting with redundant use of the promise constructor to wrap code that already uses promises.

- The third mistake is **forgetting to terminate chains with catch**.
  - Unterminated promise chains lead to uncaught promise rejections in most browsers. See error handling below.

- A good rule of thumb is to **always either return or terminate promise chains, and as soon as you get a new promise, return it immediately, to flatten things**:

```js
doSomething()
  .then(function (result) {
    // If using a full function expression: return the promise
    return doSomethingElse(result);
  })
  // If using arrow functions: omit the braces and implicitly return the result
  .then((newResult) => doThirdThing(newResult))
  // Even if the previous chained promise returns a result, the next one
  // doesn't necessarily have to use it. You can pass a handler that doesn't
  // consume any result.
  .then((/* result ignored */) => doFourthThing())
  // Always end the promise chain with a catch handler to avoid any
  // unhandled rejections!
  .catch((error) => console.error(error));
  // Now we have a single deterministic chain with proper error handling.
```

- Side note: Using `async`/`await` addresses most, if not all, of these problems — the tradeoff being that it may be easy to forget the `await` keyword.


## Error handling

- The previous async chain:


```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

- is similar to it's blocked version.

```js
try {
  const result = syncDoSomething();
  const newResult = syncDoSomethingElse(result);
  const finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch (error) {
  failureCallback(error);
}
```


## Promise

