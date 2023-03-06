# Currying with `bind`, `apply` and `call`

- Currying enables us to compose the functionality into different functions.
- From [medium post](https://medium.com/dev-bits/a-perfect-guide-for-cracking-a-javascript-interview-a-developers-perspective-23a5c0fa4d0d)
  - Use `.bind()` when you want that function to later be called with **a certain context**, useful in **events**.
  - Use `.call()` or `.apply()` when you want to **invoke the function immediately**, with modification of the **context**.

- For example, say you have:

```js
var cylinder = {
    pi: 3.14,
    volume: function (r, h) {
        return this.pi * r * r * h;
    }
};

console.log(cylinder.volume(3, 4)); //113.03999999999999
```

- The `cylinder.volume(3, 4);` is the normal usage for what's defined. But you could actually call it with a **context**.
  - A context is **an object that replaces this keyword inside the area function**.
  - The original function arguments are passed as subsequent arguments after context object.

```js
                 //v ---> passed context as first argument
console.log(cylinder.volume.call({pi: 3.14159}, 3, 4)); //113.09723999999999
                              // ^ --> original argument passed after context
```

- `apply` is exactly same except Function arguments are passed as a list

```js
console.log(cylinder.volume.apply({ pi: 3.14159 }, [3, 4]));
```

- `bind` attaches a brand new this to a given function. In bind’s case, the function is not executed instantly like `call` or `apply`.
  - It allows us to inject a context into a function which returns a new function with updated context. It means this variable will be user supplied variable.

```js
var newVol = cylinder.volume.bind({pi: 3.14159}); // not instantly called
console.log(newVol(3, 4)); // pi is bind to 3.14159
```