# Fundamentals of React

> From book [Road to React](https://www.roadtoreact.com/)

- **Single-page applications (SPA)** have become increasingly popular with first generation SPA frameworks like Angular (by Google), Ember, Knockout, and Backbone.
- Using these frameworks made it easier to build web applications that advanced beyond vanilla JavaScript and jQuery. React, yet another solution for SPAs, was released by Facebook later in 2013.
- All of them are used to create modern web applications in JavaScript.

## Pre SPA era

Pre SPA, essentially **everything crucial is done by the server**, whereas the **client plays a minimal role by just rendering page by page.**

- websites and web applications were rendered from the server.
- A user visits a URL in a browser and requests one HTML file and all its associated HTML, CSS, and JavaScript files from a web server.
- After some network delay, the user sees the rendered HTML in the browser (client) and starts to interact with it.
- Every additional page transition (meaning: visiting another URL) would initiate this chain of events again.
- While barebones HTML and CSS were used to structure and style the application, just a little bit of JavaScript was thrown into the mix to make interactions (e.g. toggling a dropdown) or advanced styling (e.g. positioning a tooltip) possible.
- A popular JavaScript library for this kind of work was jQuery


In contrast, modern JavaScript **shifted the focus from the server to the client.** The most extreme version of it:

- A user visits a URL and requests one small HTML file and one larger JavaScript file.
- After some network delay, the user sees the "by JavaScript rendered HTML" in the browser and starts to interact with it.
- Every additional page transition wouldn’t request more files from the web server, but would use the initially requested JavaScript to render the new page.
- Also, every additional interaction by the user is handled on the client too.

In this modern version

- **the server delivers mainly JavaScript across the wire with one minimal HTML file.**
- The HTML file then **executes all the linked JavaScript from the files on the client-side to render the entire application with HTML and uses JavaScript for its interactions**

React, among the other SPA solutions, makes this possible.

- Essentially **a SPA is one bulk of JavaScript, which is neatly organized in folders and files, to create a whole application**
- whereas **the SPA framework (e.g. React) gives you all the tools to architect it.**
- This JavaScript-focused application is delivered once over the network to your browser when a user visits the URL for your web application.
- From there, React, or any other SPA framework, takes over for rendering everything in the browser as HTML and for dealing with user interactions with JavaScript.


With the rise of React, the concept of **components** became popular.

- Every　**component defines its look and feel with HTML, CSS, and JavaScript.**
- Once a　component is defined, it can be used **in a hierarchy of components for creating an entire application.**
- Even though React has a strong focus on components as a library, the surrounding ecosystem makes it a flexible framework.


## Setting vite react project

```bash
npm create vite@latest react_basic -- --template react-ts
cd react_basic/
npm install
npm run dev
```

`package.json`:

- This file shows you a list of all third-party dependencies (e.g.: node packages which are located in the node_modules/) and
- other essential project configurations related to Node/npm.
- All your project-specific commands can be found in your `package.json` file under the scripts property.

```xml
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

- implies you can do `npm run {dev|build|lint|preview}`
- preview can be used to run the production-ready build on your local machine for testing purposes.
  - In order to make it work, you have to execute `npm run build` before running `npm run preview`.
  - Essentially `npm run dev` and `npm run preview` (after `npm run build`) should give the identical output in the browser.
  - However, the former is not optimized by a build for production and should exclusively be used for the local development of the application.


`package-lock.json`:

- This file indicates npm how to resolve all node package versions and their internal third-party dependencies.
- We’ll not touch this file.

`public/`:

- This folder holds static assets for the project like a favicon which is used for the browser tab’s thumbnail when starting the development server or building the project for production.

`index.html`:

- The HTML that is displayed in the browser when starting the project.
- If you open it, you shouldn’t see much content though. However, you should see a `script` tag which **links to your source folder** where all the React code is located to output HTML/CSS in the browser.

`src/`:

- In the beginning, everything you need is located in the `src/` folder.
- The main focus lies on the `src/App.tsx` file which is used to implement React components.
- It will be used to implement your application, but later you might want to split up your React components into multiple files, where each file maintains one or more components on its own.
- Additionally, you will find a `src/main.tsx` as an entry point to the React world.
- There is also a `src/index.css` and a `src/App.css` file to style your overall application and components, which comes with the default style when you open them.


## Hello World with the React Component

Every React application is built on the foundation of React components

- First React component is located in the src/App.tsx, called `App` component.
- It is just a JavaScript function.
- In contrast to traditional JavaScript functions, it’s defined in PascalCase.
  - **A component has to start with a capital letter, otherwise it isn’t treated as component in React.**

The kind of the App component is commonly called a **function component**.

- Function components are the modern way of using components in React, however, be aware that there are other variations of React components.

The `App` component doesn’t have any parameters in its function signature yet.

- To pass information from one component to another component, we will do it through `props`.
- These `props` will be accessible via the function’s signature as parameters.

The `App` component returns code that resembles HTML.

- You will see how this new syntax "JSX", allows you to combine JavaScript and HTML for displaying highly dynamic and interactive content in a browser.

The function of a component runs every time a component is displayed in the browser.

- This happens for the initial rendering (read: displaying) of the component, but also
- whenever the component updates because it has to display something different due to changes (re-rendering).
- Variables defined in the function’s body will be re-defined each time this function runs. As a rule of thumb: If a variable does not need anything from within the function component’s body (e.g. parameters), then define it outside of the component which avoids re-defining it on every function call.


## React JSX

- returned output of the App component not only resembles HTML, but it can also be mixed with JavaScript.
- In fact, this output is called JSX (JavaScript XML), which powerfully combines HTML and JavaScript.


- Changing the variable in the source code and seeing the change reflected in the browser is not solely connected to React, but also to the underlying **development server** when we start our application on the command line.
- Any time one of our files changes, the development server notices it and reloads all affected files for the browser.
- The bridge between React and the development server which makes this behavior possible is called **React Fast Refresh** (prior to that it was **React Hot Loader**) on React’s side and Hot Module Replacement on the development server’s side.

- When using HTML in JSX, React internally translates all HTML attributes to JavaScript where certain words such as class or for are reserved during the rendering process.
- Therefore React came up with replacements such as className and htmlFor for them. However, once the actual HTML is rendered for the browser, the attributes get translated back to their native variant.

```js
// JSX ...
const myElement = <h1>Hello {title}</h1>;

// ... gets transpiled to JavaScript
const myElement = React.createElement('h1', null, `Hello ${title}`);

// ... gets rendered as HTML by React
<h1>Hello React</h1>
```
- Initially invented for React, JSX gained popularity in other modern libraries and frameworks as well. These days, it’s not strictly coupled to React, but people are usually connecting it to React.

- What is JSX == HTML x Javascript? Check how the list is generated below:

```js
const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    objectID: 1
  },
];

function App() {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return <li key={item.objectID}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}
```

- Once we’ve defined a Component, we can use it as an **element** anywhere in our JSX.
- The element produces an instance of your Component.


## React DOM

- Open the `src/main.tsx` file to the see `App` components instantiation with the `<App/>` element.
- Open the `index.html` file on the side and spot the HTML element where the id attribute equals "root". That’s exactly the element where React inserts itself into the HTML to bootstrap the entire React application – starting with the `App` component.
- In the JavaScript file, the `createRoot()` method expects the HTML element that is used to instantiate React. There we are using JavaScript’s built-in `getElementById()` method to return the HTML element that we have seen in the `index.html` file.
- Once we have the root object, we can call `render()` on the returned root object with JSX as parameter which usually represents the entry point component (also called root component).
- Normally the entry point component is the instance of the App component, but it can be any other JSX too.
- Essentially React DOM is everything that’s needed to integrate React into any website which uses HTML.
- "the rise of single-page applications that are powered by only a small HTML file and a large JavaScript file"
  - While one small HTML file (here: `index.html`) and one large JavaScript file (here: compiled and bundled `src/main.tsx` and `src/App.tsx` files) are transferred from web server to browser, the JavaScript file(s) are mostly responsible to render all the HTML in the browser.
  - The HTML file is only there to request the JavaScript file and to render the HTML element where React inserts itself.
  - From there, React calls all of its needed function components to render itself as component hierarchy.


## Arrow function expression

```js
// function declaration
function App() { ... }

// arrow function expression
const App = () => { ... }
```

- If an arrow function’s only purpose is to return a value and it doesn’t have any  logic in between, you can remove the block body (curly braces) of the function.
- In a concise body, an implicit return statement is attached, so you can remove the return statement:

```js
// with block body
const addOne = (count) => {
  // perform any task in between
  return count + 1;
};

// with concise body
const addOne = (count) => count + 1;
```

- Hence, you can do:

```js
const Listify = () => (
  <ul>
    {list.map((item) => (
      <li key={item.objectID}>{item.title}</li>
    ))}
  </ul>
);
```

or

```js
const Search = () => {(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}
```

- while an implicit return statement when using an arrow function expressions makes your component declaration more concise, you may introduce tedious refactorings from concise to block body when you need to perform tasks between function signature and the return statement.
- So you may want to keep your arrow function expression with a block body (like in the last code snippet) all the time.



## Handler Function in JSX

- In native HTML, we can add event handlers on elements by using the `addEventListener()` method programmatically on a DOM node.
- To do this in React way ... For example, the change event of the `input` field.
- In React, define a function (which is called an (event) handler).
- Afterward, the function can be passed to the `onChange` attribute (JSX named attribute) of the HTML input field.

```js
const Search = () => {
  const onHandleInput = (event) => {
    console.log(event);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={onHandleInput}/>
    </div>
  );
}
```

- When you `console.log(event)`, you will see event being a 'synthetic event' JavaScript object and the input field’s internal value.
- React’s synthetic event is essentially a wrapper around the browser’s native event.
- Since React started as library for single-page applications, there was the need for enhanced functionalities on the event to prevent the native browser behavior.
- For example, in native HTML submitting a form triggers a page refresh. However, in React this page refresh should be prevented, because the developer should take care about what happens next.
- Anyway, if you happen to need access to the native HTML event, you could do so by using `event.nativeEvent`
  - but after several years of React development I never ran into this case myself.
  - After all, this is how we pass HTML elements in JSX handler functions to add listeners for user interactions.
  - Always pass functions to these handlers, not the return value of the function, except when the return value is a function again.
- Knowing this is crucial because it’s a well-known source for bugs in a React  beginner’s application:

```js
// if handleChange is a function
// which does not return a function
// don't do this
<input onChange={handleChange()} />
// do this instead
<input onChange={handleChange} />
```

## React Props

- The most important fact about `props`: it’s not allowed to change them, because they should be treated as an immutable data structure.
- They are only used to pass information down the component hierarchy.
- Continuing this thought, information (`props`) can only be passed from a parent to a child component and not vice versa.

```js

const Details = (props) => (  // child component of Listify
  <li>
    <span>
      <a href={props.item2.url}>{props.item2.title}</a>
    </span>
    <br />
    <span>{props.item2.author}</span>
  </li>
);

const Listify = (props) => (
  <ul>
    {props.items1.map( // naming `items1` is defined in below jsx tag
      (
        item
      ) => (
        <Details key={item.objectID} item2={item} />
      )
    )}
  </ul>
);

function App() {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      objectID: 1,
    },
  ];
  return (
    <div>
      <h1>1223</h1>
      <Search />
      <hr />
      <Listify items1={stories} /> <!-- how the props is passed -->
    </div>
  );
}
```

## React states

- While it is not allowed to mutate React props as a developer, because they are only there to pass information from parent to child components, React state introduces a mutable data structure (read: stateful values).
- These stateful values get instantiated in a React component as so called state, can be passed with props as vehicle down to child components, but can also get mutated by using a function to modify the state.
- When a state gets mutated, the component with the state and all child components will re-render.
- Both concepts, props and state, have clear defined purposes: While props are used to pass information down the component hierarchy, state is used to change information over time.

- Example: Whenever a user types text into our HTML input field element in the Search component, the user wants to see this information (state) displayed next to it.

```js
const Search = () => {
  let searchTerm = '';
  const onHandleInput = (event) => {
    searchTerm = event.target.value;
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={onHandleInput} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};
```

- Above won't work - the output does not appear below the HTML input field after typing into it.
- What’s missing is telling React that searchTerm is a stateful value.

```js
const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const onHandleInput = (event) => {
    setSearchTerm(event.target.value);
  };
  // return the same as above
};

```

- By using `useState`, we are telling React that we want to have a stateful value which changes over time.
  - And whenever this stateful value changes, the affected components (here: Search component) will re-render to use it (here: to display the recent value)
- React’s `useState` method takes an initial state as an argument – in our case it is an empty string.
- Calling this method will return an array with two entries:
  - The first entry (searchTerm) represents the current state (read).
  - The second entry (setSearchTerm) is a function to update this state (write).
- It’s important to note that the `useState` function is called a **React hook**.
  - You can have as many useState hooks as you want in one or multiple components.
  - state can be anything from a JavaScript string (like in this case) to a more complex data structure such as an array or object.
- React only re-renders this component (and all of its potential descendant components) after its state has changed.
  -  In essence every component in a React application has one initial rendering followed by potential re-renderings.
  - Usually the initial rendering happens when a React component gets displayed in the browser.
  - Then whenever a side-effect occurs, like a user interaction (e.g. typing into an input field), the change is captured in React’s state which forces a re-rendering of all the components affected by this change; meaning Q
- When the UI is rendered for the first time, every rendered component’s `useState` hook gets initialized with an initial state which gets returned as current state.
  - Whenever the UI is re-rendered because of a state change, the useState hook uses the most recent state from its internal closure.
  - This might seem odd, as one would assume the useState gets declared from scratch every time a component’s function runs. However, next to each component React allocates an object where information like state is stored in memory.
  - Eventually the memory gets cleaned up once a component is not rendered anymore through JavaScript’s garbage collection

## Callback Handlers in JSX

- When using `props` as vehicle to transport information, we can only talk to descendant components.
- When using `state`, we can make information stateful, but this information can also only be passed down by using `props` as container.
- There is no way to pass information up the component tree, since `props` are naturally only passed downwards.
- However, we can introduce a **callback handler** instead:
- A callback handler ...
  - gets introduced as event handler (A),
  - is passed as function in props to another component (B),
  - is executed there as callback handler (C),
  - and calls back to the place it was introduced (D)
  - (Check A/B/C/D in below comments in the code snippet)

```js
const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  // The callback handler when input change
  const handle1 = (event) => {
    setSearchTerm(event.target.value);
    console.log("search receive change:" + event);

    // (C) The callback function (B) -> handler (A) is invoked
    // and eventually in (D), the result shows up
    props.onCallbackB(event);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handle1} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};


function App() {
  // (A) the handle of callback function is in defined
  const handleA = (event) => {
    // (D) eventually, the handling function is called when event happens
    console.log("App receives callback:" + event.target.value)
  }

  // here, the callback function name "onSearch" is defined
  // and (B) the handling function is passed in as props
  return (
    <div>
      <Search onCallbackB={handleA} />
    </div>
  );
}
```

## How to make `Listify` component to use the search bar text?

- We've used the stateful `searchTerm` from the `Search` component
- How to use the user input to filter the stories by their title property in the App component before they are passed as props to the Listify component?
- The proper solution is actually "lift" the `searchTerm` state up to App. Why? If the App component is interested in the `searchTerm` state to filter the stories, why not instantiate the state in the App component instead of in the `Search` component in the first place?


```js
import "./App.css";
import React from "react";

const Details = (props) => (
  <li>
    <span>
      <a href={props.item2.url}>{props.item2.title}</a>
    </span>
    <span/>
    <span>{props.item2.author}</span>
  </li>
);

const Listify = (props) => (
  <ul>
    {props.items1.map(
      (
        item // items is defined in below jsx tag
      ) => (
        <Details key={item.objectID} item2={item} />
      )
    )}
  </ul>
);

const Search = (props) => {
  // when search text change, triggers callback in the parent Component App
  // and the parent level state is changed in callback

  // note: sync the html value here so the display is always what
  // you see. (If there is no value={props.stateSearchText} line, say
  // you give below state declaration some random initialize value
  // `const [searchTerm, setSearchTerm] = React.useState("asdfas");`
  // that random value won't reflect to what you see in the html.
  // (Only till the first time you start to input something and the
  // onChange callback is triggered
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search"
             type="text"
             onChange={props.onSearchTextChange}
             value={props.stateSearchText}
      />
    </div>
  );
};

function App() {
  // const stories = ...

  // pull the state up to App component
  const [searchTerm, setSearchTerm] = React.useState("");

  // making update the state to be from App level instead of Search level,
  // as not only Search component is interested in the user input
  const handle2 = (event) => {
    setSearchTerm(event.target.value);
  };

  // use the user input to filter the stories that we will put to listify
  const storiesMatchingSearch = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm);
  });

  return (
    <div>
      <h1>Viewer</h1>
      <Search onSearchTextChange={handle2} stateSearchText={searchTerm} />
      <hr />
      <Listify items1={storiesMatchingSearch} />
    </div>
  );
}

export default App;

```

### Rule of thumb:

- Always manage state at a component level where every component that’s interested in it is one that either manages the state (using information directly from state, e.g. App component) or a component below the state managing component (using information from props, e.g. List or Search components).
- If a component below needs to update the state (e.g. Search), pass a callback handler down to it which allows this particular component to update the state above in the parent component.
- If a component below needs to use the state (e.g. displaying it), pass it down as props.



## React controlled Component

- HTML elements come with their internal state which is not coupled to React.
- Check the comment in above `<input>` tag, you have to set the `value` to make sure the HTML value (as what you see on the page) is controlled by React state (as you probably wish).
- And when you set the value based on your React state, now the tag is controlled by React - html tag no longer keeps its internal state.
- Whenever the HTML element emits a change event, the new value is written to Reacts state and re-renders the components. Then the HTML element uses the recent state as value again.


## Props Destructuring via Object Destructuring

- React props are just a JavaScript object. Since props is an object which just passes information from one component to another component,
- we can destruct the props object right away in the component’s function signature

```js
const Search = ({onSearchTextChange, stateSearchText}) => {
  return //....same as before
}
```

## JS techniques: Nested destructing

```js
const Details = ({item2 : {  // destruct the item content right away
      title,                 // then below you don't need to use item2.title etc
      url,
      author,
      num_comments,
      points,
      objectID,
    }
  }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span/>
    <span>{author}</span>
  </li>
);
```

- Nested destructuring introduces lots of clutter through indentations in the function signature. While here it’s not the most readable option, it can be useful in other scenarios though.

## JS techniques: Spread and Rest Operators

- spread operator allows us to literally spread all key/value pairs of an object to another object


```js
const profile = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};
const address = {
  country: 'Germany',
  city: 'Berlin',
};
const user = {
  ...profile,       // spread operator
  gender: 'male',
  ...address,       // spread operator
};
```

- Hence, we could do:

```js
const Details = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span />
    <span>{author}</span>
  </li>
);

// spread the item in map to key value pair
const Listify = ({ items1 }) => (
  <ul>
    {items1.map(
      (
        item
      ) => (
        <Details key={item.objectID} {...item} />
      )
    )}
  </ul>
);
```

- The rest operator is always used to separate an object from some of its properties.
  - Rest operation happens always as the last part of an object destructuring

```js
const user = {
  id: '1',
  firstName: 'Robin',
  lastName: 'Wieruch',
  country: 'Germany',
  city: 'Berlin',
};
const { id, country, city, ...userWithoutAddress } = user;

console.log(userWithoutAddress);
// {
//    firstName: "Robin",
//    lastName: "Wieruch"
// }
console.log(id);
// "1"
console.log(city);
// "Berlin"
```

- Hence, we could do:

```js
const Details = ({ title, url, author, ...noUsedField }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span />
    <span>{author}</span>
  </li>
);


const Listify = ({ items1 }) => (
  <ul>
    {items1.map(
      (
        { objectID, ...item }
      ) => (
        <Details key={objectID} {...item} />
      )
    )}
  </ul>
);

```

- Even though both have the same syntax (three dots), the rest operator shouldn’t be mistaken with the spread operator. Whereas the rest operator happens on the left side of an assignment, the spread operator happens on the right side.
- all these variations have their pros and cons. When refactoring a component, always aim for readability, especially when working in a team of people, and make sure everyone is using a common React code style.

### Rules of thumb

- Always use object destructuring for props in a function component’s function signature, because props are rarely used themselves. Exception: When props are only passed through the component to the next child component.
- Use the spread operator when you want to pass all key/value pairs of an object to a child component in JSX.
  - For example, often props themselves are not used in a component but only passed along to the next component.
  - Then it makes sense to just spread the props object {...props} to the next component.
- Use the rest operator when you only want to split out certain properties from your props object.
- Use nested destructuring only when it improves readability


## React Side-Effects

- At the moment, whenever you search for a term in our application you will get the result. However, once you close the browser and open it again, the search term isn’t there anymore.

```js
function App() {
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'DflVal');

  const handle2 = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search', event.target.value)
  };
  //...
```

- Essentially we synchronized the browser’s local storage with React’s state.
- The flaw: If we use the `setSearchTerm` state updater function somewhere else in our application, we break the feature because the local storage doesn’t get updated.
- React’s `useEffect` Hook fixes this by handling the side-effect at a centralized place and not in a specific handler.
  - In React, a side effect is any code that causes a change outside the component, such as updating the DOM, fetching data, or setting a timer.
  - The `useEffect` hook is used to manage side effects in a functional component.
- When using `useEffect`, the second argument is an array of dependencies that specify which variables or values the effect depends on.
- React’s `useEffect` Hook takes two arguments:
  - The first argument is **a function that runs our side-effect.**
    - In our case, the side-effect stores searchTerm into the browser’s local storage.
  - The second argument is a **dependency array of variables**.
    - If one of these variables changes, the function for the side-effect is called.
- Whenever and wherever the `searchTerm` state is updated (via `setSearchTerm`), the browser’s local storage will always be in sync with it.

```js
  const [searchTerm, setSearchTerm] = React.useState(
    // same as before, getting last time input as initialize value, if exists
    localStorage.getItem("search") || "DflVal"
  );

  // The side effect hook!!!!!
  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handle2 = (event) => {
    // no longer explicitly sync localStorage
    setSearchTerm(event.target.value);
  };
```

- NOTE: There is a critical difference is between providing an empty dependency array and not providing any dependency array at all.
- If the array is empty, the effect doesn't depend on any values, so it only needs to **run once when the component is mounted.**
  - This is useful for effects that only need to be executed once, like fetching initial data from an API or setting up event listeners.
- If no dependency array is provided, the effect depends on all the state and props values used in the component, so it will **run on every re-render of the component**, even if the effect doesn't actually need to run again.
  - This can be a performance issue if the effect is expensive or causes unnecessary re-renders.
- By providing a dependency array, developers can control when an effect runs, which can help optimize performance and avoid unnecessary re-renders.
- In summary, providing an empty dependency array means the effect runs once on mount, while not providing a dependency array means the effect runs on every re-render.

## React Custom Hooks

- A custom hook can encapsulate non-trivial implementation details that should be kept away from a component, can be used in more than one React component, can be a composition of other hooks, and can even be open-sourced as an external library.
- For example, a generic wrapper of customer hook for the `localStorage` could look like:

```js
// pull out the localStorage logic in one customer hook
// follow the naming convention of use* as hook
// also return what useState would have returned
const useLocalStorageState = (key, initialStateVal) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialStateVal
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
      // Note: Since the key comes from outside, the custom hook
      // assumes that it could change, so it needs to be included
      // in the dependency array
  }, [value, key]);

of the useEffect hook as well. 
  return [value, setValue];
};

function App() {
  //...
  const [searchTerm, setSearchTerm] = useLocalStorageState("search", "DftVal");

  const handle2 = (event) => {
    setSearchTerm(event.target.value);
  };
  //...
}
```

## React Fragments

Ways you can return multiple tags from components:


1. Wrap around with `<div>` tag

```js
const Search = ({ search, onSearch }) => (
<div>
  <label htmlFor="search">Search: </label>
  <input
    id="search"
    type="text"
    value={search}
    onChange={onSearch}
  />
</div>
);
```

2. return as a list, ugly, ignore here

3. React fragment

```js
const Search = ({ search, onSearch }) => (
  <React.Fragment>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </React.Fragment>
);
```

4. Shorten version of React fragment

```js
const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </>
);
```

## Generalize reusable component

- Below extract the Search component to a generalized, reusable component.


```js
const InputWithLabel = ({ id, label, value, type = 'text',  onInputChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

function App() {
  //...
  return (
    <>
      <h1>Viewer</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handle2}/>
      <!--other tags-->
    </>
  );
}
```

## React Component Composition

- The problem, for snippet from above section, what if we want to do:

```js
function App() {
  //...
  return (
    <>
      <h1>Viewer</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handle2}>
      <strong>!!!I want to add some HTML in between of React component!!!</strong>
      </InputWithLabel>
      <!--other tags-->
    </>
  );
}
```

- Essentially a React application is a bunch of React components arranged in the shape of a tree.
- Component composition essentially enables React element to be used in the same fashion as an HTML element by leveraging its opening and closing tag.
- In the `InputWithLabel` component, you have access to this information via React’s `children` prop now:


```js
const InputWithLabel = ({ id, label, value, type='text', onInputChange, children }) => (
  <>
    <label htmlFor={id}>{label}{children}</label>
    <!--other stuff-->
  </>
);

```

- Note that you can pass React elements via React children as well - hence, the composition.


## Imperative React

- React is inherently declarative.
  - Imperative programming focuses on describing explicit steps or instructions for the computer to follow in order to achieve a desired outcome.
    - It is a step-by-step approach where you define the sequence of operations to be performed.
    - In imperative programming, you explicitly specify how to solve a problem by defining algorithms using statements and control flow structures.
  - Declarative programming, emphasizes describing what you want to achieve rather than how to achieve it.
    - Instead of explicitly specifying a sequence of steps, you declare the desired outcome or result and let the programming language or framework figure out the most efficient way to achieve it.
    - Declarative programming is typically more focused on describing the problem domain rather than the specific implementation details.
- There are cases when we will not want everything to be declarative. However, imperative programming in React is often verbose and counterintuitive, though.

- Example, declarative way to make autoFocus for the search box

```js

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => (
  <>
    <label htmlFor={id}>
      {label}
      {children}
    </label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      autoFocus={isFocused}
      onChange={onInputChange}
    />
  </>
);
//...
function App() {
  // other stuff
  return (
    <>
      <h1>Viewer</h1>
      <!--using isFocused as an attribute == `isFocused={true}`.-->
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handle2}
      >
      <!--other stuff-->
      </InputWithLabel>
      <!--other stuff-->
    </>
  );
}
```

- To do this iteratively:


```js
const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();    // ..........(A)

  React.useEffect(() => {  // .....................(C)
    if (isFocused && inputRef.current) {
      inputRef.current.focus(); // ................(D)
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>
        {label}
        {children}
      </label>
      &nbsp;                        <!--............(B)-->
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

function App() {
  // other stuff like before
  return (
    <>
      <h1>Viewer</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused // using isFocused as an attribute == `isFocused={true}`.
        onInputChange={handle2}
      >
      <!--other stuff-->
      </InputWithLabel>
      <!--other stuff-->
    </>
  );
}
```

- (A) create a `ref` with React’s `useRef` Hook. This `ref` object is a persistent value which stays intact over the lifetime of a React component. It comes with a property called `current`, which, in contrast to the `ref` object, can be changed.
- (B) Second, the `ref` is passed to the element’s **JSX-reserved `ref`** attribute and thus element instance gets assigned to the changeable `current` property.
- (C) Third, opt into React’s lifecycle with React’s `useEffect` Hook, performing the focus on the element when the component renders (or its dependencies change).
- (D) And fourth, since the `ref` is passed to the element’s `ref` attribute, its `current` property gives access to the element. Execute its focus programmatically as a side-effect, but only if `isFocused` is set and the `current` property is existent


## Inline Handler in JSX

- Imagine following above, we want to remove items when click a button

```js

function App() {
  // other stay the same

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID != story.objectID
    );
    setStories(newStories);
  }

  // other stay the same

  return (
    <>
      <!--other stay the same-->
      <Listify itemsToList={storiesMatchingSearch} onRemoveItem={handleRemoveStory}/>
    </>
  );
}

const Details = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item)
  };
  return (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span />
    <span>{item.author}</span>
    <span>
      <button type="button" onClick={handleRemoveItem}>
        Dismiss
      </button>
    </span>
  </li>
  );
}

const Listify = ({ itemsToList, onRemoveItem }) => (
  <ul>
    {itemsToList.map((item) => (
      <Details
        key={item.objectID}
        item = {item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

```

- We can do this in inline handler way

```js
const Details = ({ item, onRemoveItem }) => {
  return (
  <li>
    <!--other stay the same-->
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
  );
}
```

### Rule of thumb:

- Note - try to avoid using complex logic in JSX.
- If inline handlers need to use a block body, because there are more than one line of code executed, it’s about time to extract them as normal event handlers.


## React Asynchronous Data

- Usually, data from a remote backend/database arrives asynchronously for clientside applications like React. Thus it’s often the case that we must render a component before we can initiate the data fetching.
- An example with simulation of async data (through setting delay for local data):

```js
  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  // start with empty list of stories, then use delay below
  // to simulate the async data flow
  const [stories, setStories] = React.useState([]);

  // use (side) effect of the resolve of the promise
  React.useEffect(() => {
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
    });
    // Due to the empty dependency array, the side-effect only
    // runs once the component renders for the first time
  }, []);

```

## React Conditional Rendering

- A conditional rendering in React always happens if we have to render different JSX based on information (e.g. state, props).

```js
  const [stories, setStories] = React.useState([]);
  // adding a new state to indicate data loading
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
      setIsLoading(false);
    });
    // Due to the empty dependency array, the side-effect only
    // runs once the component renders for the first time
  }, []);
  //...
  return (
    <>
      <!--other stuff-->
      <!--Use conditional rendering-->
      {isLoading? (
        <p>Loading ...</p>
      ) : (
        <Listify
          itemsToList={storiesMatchingSearch}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </>
  );
```

- We can also use this to do error handling

```js
  // other stuff
  // adding new state to indicate error
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
      setIsLoading(false);
    }).catch(
      () => setIsError(true) // modify the state when exception happens
    );
  }, []);

  // other stuff

  return (
    <>
      <!--other stuff-->
      <!--adding new conditional redering-->
      {isError && <p>Something went wrong while loading...</p>}
      <!--other stuff-->
    </>
  );
}
```

- Note that in JavaScript, a `true && 'Hello World'` always evaluates to `‘Hello World’`. A `false && 'Hello World'` always evaluates to `false`.
- Hence `{isError && <p>Something went wrong while loading...</p>}` evaluates to the `<p>Something went wrong while loading...</p>` when `isError` is `true`


## React Advanced State

- React’s `useReducer` Hook enables one to use more sophisticated state management for complex state structures and transitions.
- Using `useReducer` over `useState` makes sense as soon as multiple stateful values are dependent on each other or related to one domain.
- The `useReducer` receives a reducer function and an initial state as arguments and returns an array with two items.
  - The first item is the current state
  - and the second item is the state updater function (also called dispatch function)

```js
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "SET_STORIES":
        return action.payload;
      case "REMOVE_STORY":
        return state.filter(
          (story) => action.payload.objectID !== story.objectID
        );
      default:
        throw new Error();
    }
  };

  // replace: original const [stories, setStories] = React.useState([]);
  const [stories, dispatchStoriesState] = React.useReducer(storiesReducer, []);

  React.useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getAsyncStories()
      .then((result) => {
        // use the dispatch function from useReducer to update state
        dispatchStoriesState({
          type: "SET_STORIES",
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    // moved the update stories into reducer function
    dispatchStoriesState({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };
```

- Instead of setting the state explicitly with the state updater function from `useState`, the `useReducer` state updater function sets the state implicitly by dispatching an action for the reducer.
- A reducer action is always associated with a `type` and as a best practice with a `payload`. If the type matches a condition in the reducer, return a new state based on incoming state and action.


## React Impossible States

- There is nothing wrong with multiple useState hooks in one React component. Be wary once you see multiple state updater functions in a row, however. These conditional states can lead to impossible states and undesired behavior in the UI.
- Fortunately, we can improve our chances of not dealing with such bugs by moving states that belong together from multiple useState (and useReducer) hooks into a single useReducer hook.

```js
function App() {
  // other stay the same

  // build a new combined state to encapsulate all state related to data
  // fetching
  const [stories, dispatchStoriesState] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // make storiesReducer change individual property accordingly
  // Noted that the function return a new stories object which contains all the
  // key/value pairs from the current state object (via spread operator)
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "STORIES_FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    }
  };


  React.useEffect(() => {
    // whenever need a state transition, need the dispatch function
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });
    getAsyncStories()
      .then((result) => {
        // whenever need a state transition, need the dispatch function
        dispatchStoriesState({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.stories,
        });
      })
      .catch(() =>
        // whenever need a state transition, need the dispatch function
        dispatchStoriesState({
          type: "STORIES_FETCH_FAILURE",
        })
      );
    // Due to the empty dependency array, the side-effect only
    // runs once the component renders for the first time
  }, []);

  const handleRemoveStory = (item) => {
    // whenever need a state transition, need the dispatch function
    dispatchStoriesState({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const storiesMatchingSearch = stories.data.filter(function (story) {
    return story.title.includes(searchTerm);
  });

  return (
    <>
      <!--same as before-->
      {stories.isError && <p>Something went wrong while loading...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <Listify
          itemsToList={storiesMatchingSearch}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </>
  );
}

```

- The state object managed by the reducer encapsulates everything related to the fetching of stories including loading and error states, but also implementation details like removing a story from the stories
- We didn’t get fully rid of impossible states, because it’s still possible to leave out a crucial boolean flag like before, but we moved one step closer towards more predictable state management.


## Data Fetching with React


```js
  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; //A
  React.useEffect(() => {
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}c++`) // B
      .then((response) => response.json()) //C
      .then((result) => {
        dispatchStoriesState({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits, //D
        });
      })
      .catch(() =>
        dispatchStoriesState({
          type: "STORIES_FETCH_FAILURE",
        })
      );
    // Due to the empty dependency array, the side-effect only
    // runs once the component renders for the first time
  }, []);

```

- (A): the API_ENDPOINT is used to fetch popular tech stories for a certain query (a search term).
- (B): the native browser’s `fetch` API is used to make this request (B).
- (C): For the `fetch` API, the response needs to be translated into JSON.
- (D): Finally, the returned result has a different data structure, which we send as payload to our component’s state reducer


## Data Re-Fetching in React

```js
  React.useEffect(() => {
    if (!searchTerm) { // null/empty/undefined wo;; trogger
      return;
    }
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}{searchTerm}`) // .... the same as above
    // other stuff the same
    // as now we need to re-redner when searchTerm change, we need to add
    // it to the dependency list
  }, [searchTerm]);
```


## Memoized Functions in React

- So far, we have...

```js
const App = () => {
  // ...
  React.useEffect(() => { // handleFetchStories body
    // some other logic...
    fetch(`${API_ENDPOINT}{searchTerm}`) // .... the same as above
    // some other logic...
  }, [searchTerm]);
  // ...
};
```

- The `useEffect` hook is directly used with a dependency array containing `searchTerm`.
- This means that whenever the `searchTerm` value changes, the effect will be triggered and the function body inside the effect will execute.
- This allows you to `fetch` data from an API based on the updated `searchTerm` value.
- The issue is, a new `handleFetchStories` function would be created each time the `App` component re-renders, and would be executed in the `useEffect` hook to fetch data.
- The fetched data is then stored as state in the component. Because the state of the component changed, the component re-renders and creates a new `handleFetchStories` function.
- The side-effect would be triggered to fetch data, and we’d be stuck in an endless loop.
- The solution to avoiding the unnecessary re-execution of the effect and the endless loop is to use memoization techniques.
  - By memoizing the `handleFetchStories` function using `useCallback`, we can ensure that the function is only recreated when its dependencies (in this case, `searchTerm`) change.
  - This way, the effect will only be triggered when the dependency changes, preventing unnecessary API requests and resolving the issue of the endless loop.

```js
const App = () => {
  // ...
  const handleFetchStories = React.useCallback(() => {
    // some other logic...
    fetch(`${API_ENDPOINT}{searchTerm}`) // .... the same as above
    // some other logic...
  }, [searchTerm]);
  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);
  // ...
};
```

- The `handleFetchStories` function is created using the `useCallback` hook with `searchTerm` as a dependency. This memoizes the function (body), ensuring that **it is only recreated when the `searchTerm` value changes.**
- The `useEffect` hook is then used with a dependency array containing `handleFetchStories`, so the effect will be triggered whenever `handleFetchStories` changes, which is when `searchTerm` value changes.

- Both code snippets essentially accomplish the same goal of fetching data based on the `searchTerm` value, the need for memoization to ensure the handleFetchStories function is only called when the searchTerm changes, even during re-renders of the App component.


In general, using `useCallback` isn't necessarily always better.

- The choice between the two approaches depends on the specific requirements and performance considerations of your application. Here are some factors to consider:

- Performance Impact:
  - Using `useCallback` with a memoized function can optimize performance by preventing unnecessary function recreations.
  - However, this optimization might not be significant or noticeable for small-scale applications or components with simple logic.
  - If performance is not a major concern or if the component does not have many dependencies, the overhead of useCallback might not provide significant benefits.

- Readability and Maintainability:
  - Using `useEffect` directly with the dependency array can make the code more straightforward and easier to understand, especially for simpler scenarios.
  - It clearly communicates the intent of the effect and its dependencies without the need for an additional `useCallback` call.

- Propagation to Child Components:
  - If the function needs to be passed down to child components as a `prop`, using `useCallback` can help prevent unnecessary re-renders of those child components when the parent component re-renders.
  - This can be beneficial if the child components rely on reference equality to determine whether props have changed.

- Other Dependencies:
  - If the function has dependencies other than `searchTerm` that might change independently, using `useCallback` with all the relevant dependencies can provide more granular control over when the function is re-created.
  - On the other hand, using `useEffect` directly with a dependency array allows you to easily include all dependencies in a single place.

## Explicit Data Fetching with React

- Right now we still have problem, every time user type one key stroke, the `searchTerm` changed, the API query is called.
- Eventually, we will be confronted with rate limiting which returns an error instead of data.
- To solve this problem, we will change the implementation details from implicit to explicit data (re-)fetching.
- What to do? We could introduce a proxy state `url` - where `url` is only changed when user click a new submit button.


```js
  // introduce a new state
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value); // same as before
  };

  const handleSearchSubmit = (vent) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  const handleFetchStories = React.useCallback(() => {
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });
    fetch(url) // now we feed in the new state url
    // other same as before ...

    // as now we need to re-redner when url change, and url only change when
    // handleSearchSubmit
  }, [url]);

  return (
    <>
      <!--same as before-->
      <InputWithLabel
        other_same_as_before
        onInputChange={handleSearchInput}
      >
      </InputWithLabel><button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >Submit</button>
      <!--other same as before-->
    </>
  );
```

## Third-Party Libraries in React

- The browser provides native `fetch` API. However, not all browsers support this.
- alternative is to substitute the native fetch API with a stable library like `axios`, which performs asynchronous requests to remote APIs.


```js
  const handleFetchStories = React.useCallback(() => {
    // same as before
    axios
      .get(url)  // an explicit HTTP GET request
      .then((result) => {  // axios no need to convert to json
        dispatchStoriesState({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.hits, //axios put payload in .data
        });
      })
```

## Async/Await in React

- We have started to resolve promises with then/catch blocks.
- However, in modern JavaScript (and therefore React), a more popular solution is using `async`/`await`.
- using `async`/`await` with `try`/`catch` over `then`/`catch` makes it often more readable, because we avoid using callback functions and instead try to make our code more readable in a synchronous way.

```js
  const handleFetchStories = React.useCallback(async () => {
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);
      dispatchStoriesState({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits, //axios put payload in .data
      });
    } catch {
      dispatchStoriesState({
        type: "STORIES_FETCH_FAILURE",
      })
    }
    // as now we need to re-redner when url change, and url only change when
    // handleSearchSubmit
  }, [url]);
```
