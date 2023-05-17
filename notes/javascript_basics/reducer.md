# [Reducer](https://www.robinwieruch.de/javascript-reducer/)


- In essence, a reducer is a function which takes two arguments -- the current `state` and an `action` -- and returns based on both arguments **a new state**.

> `(state, action) => newState`


- The reducer function is a pure function without any side-effects, 
  - which means that given the same input (e.g. `state` and `action`), the expected output (e.g. `newState`) will always be the same.
- `state` in general is some javascript object, (or maybe just an integer etc)
- `state` is never changed by reducer directly. Instead the reducer always creates a new state.
- A common `action` object comes with a mandatory type property and an optional payload:
  - The `type` property chooses the conditional state transition.
  - The `action` payload provides information for the state transition.

- Example:

```js
const personReducer = (person, action) => {
  switch (action.type) {
    case 'INCREASE_AGE':
      // Since we know about the state being a immutable data
      // structure, we can use the JavaScript spread operator to
      // create a new state object from the incoming state and the
      // part we want to change. The spread operator ... to isolate
      // the needed property of object
      return { ...person, age: person.age + 1 };
    case 'CHANGE_LASTNAME':
      return { ...person, lastname: action.payload.lastname };
    default:
      return person; // the original state
  }
};
```

```js

const initialState = {
  firstname: 'FFF',
  lastname: 'LLL',
  age: 30,
};

const action = {
  type: 'CHANGE_LASTNAME',
  payload: {
    lastname: 'Wieruch',
  },
};

const result = personReducer(initialState, action);

expect(result).to.equal({
  firstname: 'FFF',
  lastname: 'LLL',
  age: 30,
});
```