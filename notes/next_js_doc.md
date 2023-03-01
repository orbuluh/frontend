# [Next.JS Doc](https://nextjs.org/learn/foundations/about-nextjs) notes

## Introduction

Next.js is a flexible React framework that gives you building blocks to create fast web applications.

:large_blue_diamond: What are the **building blocks**?

- User Interface - how users will consume and interact with your application.
- Routing - how users navigate between different parts of your application.
- Data Fetching - where your data lives and how to get it.
- Rendering - when and where you render static or dynamic content.
- Integrations - what third-party services you use (CMS, auth, payments, etc) and how you connect to them.
- Infrastructure - where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).
- Performance - how to optimize your application for end-users.
- Scalability - how your application adapts as your team, data, and traffic grow.
- Developer Experience - your team’s experience building and maintaining your application.

:large_blue_diamond: What is React?

- React is a JavaScript library for building interactive user interfaces (the elements that users see and interact with on-screen).
- By library, we mean React provides helpful functions to build UI, but leaves it up to the developer where to use those functions in their application.

:large_blue_diamond: What is Next.js?

- Next.js is a React framework that gives you building blocks to create web applications.
- By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

![](https://nextjs.org/static/images/learn/foundations/next-app.png)

:large_blue_diamond: Rendering User Interfaces

- When a user visits a web page, the server returns an HTML file to the browser. The browser then reads the HTML and constructs the Document Object Model (DOM). The DOM is an object representation of the HTML elements. It acts as a bridge between your code and the user interface, and has a tree-like structure with parent and child relationships

|||
|--|--|
|![](https://nextjs.org/static/images/learn/foundations/html-to-dom.png)|![](https://nextjs.org/static/images/learn/foundations/dom-to-ui.png)|

- You can use **DOM methods** and a programming language, such as JavaScript, to listen to user events and manipulate the DOM by selecting, adding, updating, and deleting specific elements in the user interface.
- DOM manipulation allows you to not only target specific elements, but also change their style and content.
- Updating the UI with JavaScript and DOM Methods, developers spend a lot of time writing instructions to tell the computer how it should do things, though.
- Wouldn't it be nice to **describe what you want to show and let the computer figure out how to update the DOM**? In other words, imperative programming is like giving a chef step-by-step instructions on how to make a pizza. Declarative programming is like ordering a pizza without being concerned about the steps it takes to make the pizza.
- A popular declarative library that helps developers build user interfaces is React.

:large_blue_diamond: React: A declarative UI library

- Compare:

```html
<!--imperative JavaScript code-->
<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const headerContent = document.createTextNode('Develop. Preview. Ship. 🚀');
  header.appendChild(headerContent);
  app.appendChild(header);
</script>
```

```html
<!--declarative React code-->
<div id="app"></div>
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/jsx">
    const app = document.getElementById('app');
    ReactDOM.render(<h1>Develop. Preview. Ship. 🚀</h1>, app);
</script>
```

Few things with react:

- `react` is the core React library.
- `react-dom` provides DOM-specific methods that enable you to use React with the DOM.
- You need to compile your React code though. Why? React uses JSX which needs to be compiled into JavaScript. You’ll need a JavaScript compiler, such as a **Babel**, to transform your JSX code into regular JavaScript.
- JSX is a syntax extension for JavaScript that allows you to describe your UI in a familiar HTML-like syntax. (e.g. the `ReactDOM.render(<h1>Develop. Preview. Ship. 🚀</h1>, app);` above)
  - The nice thing about JSX is that apart from following three JSX rules, you don’t need to learn any new symbols or syntax outside of HTML and JavaScript.


