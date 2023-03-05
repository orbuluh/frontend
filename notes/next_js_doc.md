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

## React Core Concepts

There are three core concepts of React to start building React applications. These are:

- Components
- Props
- State

### Building UI with **Components**

- User interfaces can be broken down into smaller building blocks called **components**.
- The nice thing about React components is that they are just JavaScript. In React, components are **functions that return UI elements**.

```js
const app = document.getElementById("app");
// React components should be capitalized to distinguish them from plain HTML
function Header() {
  return (<h1>Develop. Preview. Ship. 🚀</h1>)
}
// can do this as well: ReactDOM.render(Header(), app);
ReactDOM.render(<Header />, app);
```

- You can nest React components inside each other like you would regular HTML elements.

```js
const app = document.getElementById("app");
// React components should be capitalized to distinguish them from plain HTML
function Header() {
  return (<h1>Develop. Preview. Ship. 🚀</h1>)
};
function Section1() {
  return (<h2>🔥🔥🔥🔥</h2>)
};
function HomePage() {
  return (
    <div>
      <Header />
      <Section1 />
    </div>
  );
}

ReactDOM.render(<HomePage />, app);
```

### Props: Passing information to components

What if you want to pass different text or you don't know the information ahead of time because you’re fetching data from an external source?

- Regular HTML elements have attributes that you can use to pass pieces of information that change the behavior of those elements.
  - For example, changing the `src` attribute of an `<img>` element changes the image that is shown. Changing the `href` attribute of an `<a>` tag changes the destination of the link.
  - In the same way, you can pass pieces of information as properties to React components. These are called **props**
- Similar to a JavaScript function, you can design components that **accept custom arguments (or props) that change the component’s behavior or what is visibly shown when it’s rendered to the screen.** Then, you can pass down these props from parent components to child components.
- In React, **data flows down the component tree.** This is referred to as **one-way data flow**. E.g. **State**, can be passed from parent to child components as props.


```js
function TryProps({ title }) {
  console.log(title);
  return (<h1>{title}</h1>); // {var} is JSX syntax
}
function HomePage() {
  return (
    <div>
      <TryProps title="😲"/>
      <TryProps title="😮"/>
      <TryProps title="🥳"/>
    </div>
  );
}
```

```js
/* Alternative */
function TryProps(props) {
  // access as object property
  console.log(props.title);
  return (<h1>{props.title}</h1>);
}
function TryProps({ title }) {
  // template literal
  return (<h1>{`Cool ${title}`}</h1>);
}
function TryProps({ title }) {
  // set default value
  return (<h1>{title? title: "Default title"}</h1>);
}
```

- To iterate a list:

```js
function TryList() {
  const names = ['a', 'b', 'c']
  return (<ul>
    {names.map((name) => (
      <li key={name}>{name}</li>
    ))}
  </ul>)
}
```

### State and Hooks

- React has a set of functions called **hooks**.
- Hooks allow you to add additional logic such as state to your components.
- You can think of state as any information in your UI that changes over time, usually triggered by user interaction.
- For example, you can use state to store and increment the number of times a user has clicked a button.
  - In fact, this is what the React hook to manage state is called: `useState()`

```js
function HomePage() {
  const [likes, setLikes] = React.useState(0 /*initial value*/);
  function handleClick() {
    setLikes(likes + 1);
    console.log("bottom clicked!")
  }
  return (
    <div>
      <button onClick={handleClick}>Like Cnt({likes})</button>
    </div>
  );
}
```

- Props is read-only information that's passed to components. State is information that can change over time, usually triggered by user interaction.
- Unlike props which are passed to components as the first function parameter, the state is initiated and stored within a component.
- You can pass the state information to children components as props, but the logic for updating the state should be kept within the component where state was initially created.

## From React to Next.js

To build a complete web application with React from scratch, there are many important details you need to consider:

- Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
- You need to do production optimizations such as code splitting.
- You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
- You might have to write some server-side code to connect your React app to your data store.

While React excels at building UI, it does take some work to independently build that UI into a fully functioning scalable application.

- A framework can solve these problems.
- But such a framework must have the right level of abstraction — otherwise it won’t be very useful.
- It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.
- Next.js handles much of the setup and configuration and has additional features to help you build React applications.

```bash
$ echo "{}" > package.json
$ npm install react react-dom next
$ mkdir pages
$ touch pages/index.jsx # then write the script here
```

- For the `pages/index.jsx` file is basically changed from the index.html from before.
  - Diff the change in [plain react version](../playground/react_hello/index.html) and [nextjs version](../playground/nextjs_hello/pages/index.jsx)
- NextJs helps to handle complex tooling configuration you no longer have to think about.
  - add `import { useState } from "react"` to the top of your file.
    - `React.useState(0)` can be used with `useState(0)` instead
  - `react`, `react-dom`, `babel` scripts are no longer needed.
  - `<html>` and `<body>` are not needed.
  - Remove the code that interacts with `app` element and `ReactDom.render()` method.
    - add `export default` to `function HomePage()`, which helps Next.js distinguish which component to render as the main component of this page.
  - Remove the `<script type="text/jsx">` tag.

```bash
# add below into package.json
    "scripts": { "dev": "next dev" },
# then you can run local server for development with fast refresh (e.g. when you
# change index.jsx, it should reflect)
npm run dev
```

- Overall, React is relatively unopinionated about how you build and structure your applications - there are multiple ways to build applications with React.Next.js provides a framework to structure your application, and optimizations that help make both the development process and final application faster.


## Next.js features

- An intuitive page-based routing system (with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh support
- API routes to build API endpoints with Serverless Functions
- Fully extendable


## Development and Production Environments

- During development, you’re building and running the application on your local machine.
- Going to production is the process of making your application ready to be deployed and consumed by users.
- Next.js provides features for both the development and production stages of an application.
  - Features that aim to improve the Developer Experience in the development stage
    - TypeScript and ESLint integration, Fast Refresh ...etc
  - In the production stage, Next.js optimizes for the end-users, and their experience using the application.
    - It aims to transform the code to make it performant and accessible.
- Since each environment has different considerations and goals, there is a lot that needs to be done to move an application from development to production.
- For instance, **the application code needs to be compiled, bundled, minified, and code split.**

## The Next.js Compiler

![](https://nextjs.org/static/images/learn/foundations/compiling.png)

- Developers write code in languages that are more developer-friendly such as JSX, TypeScript, and modern versions of JavaScript. The code needs to be compiled into JavaScript before browsers can understand them.
- Next.js has a compiler written in Rust, and SWC, a platform that can be used for **compilation, minification, bundling**, and more.
- In Next.js, compilation happens during the development stage as you edit your code, and as part of the build step to prepare your application for production

## What is Minifying?

![](https://nextjs.org/static/images/learn/foundations/minifying.png)

- Developers write code that is optimized for human readability. This code might contain extra information that is not necessary for the code to run, such as comments, spaces, indents, and multiple lines.
- Minification is **the process of removing unnecessary code formatting and comments without changing the code’s functionality**. The goal is to improve the application’s performance by decreasing file sizes.
- In Next.js, JavaScript and CSS files are automatically minified for production.


## What is Bundling?

- Developers break up their application into modules, components, and functions that can be used to build larger pieces of their application. Exporting and importing these internal modules, as well as external third-party packages, creates a complex web of file dependencies.
- Bundling is **the process of resolving the web of dependencies and merging (or ‘packaging’) the files (or modules) into optimized bundles for the browser**, with the goal of **reducing the number of requests for files when a user visits a web page.**

## What is Code Splitting?

![](https://nextjs.org/static/images/learn/foundations/code-splitting.png)

- Developers usually split their applications into multiple pages that can be accessed from different URLs. Each of these pages becomes a unique entry point into the application.
- Code-splitting is the process of **splitting the application’s bundle into smaller chunks required by each entry point**. The goal is to **improve the application's initial load time by only loading the code required to run that page**.
- Next.js has built-in support for code splitting.
  - **Each file inside your `pages/` directory will be automatically code split into its own JavaScript bundle during the build step.**
  - Any code shared between pages is also split into another bundle to avoid re-downloading the same code on further navigation.
  - After the initial page load, Next.js can start pre-loading the code of other pages users are likely to navigate to.
  - Dynamic imports are another way to manually split what code is initially loaded.

## Build Time and Runtime

- Build time (or build step) is the name given to a series of steps that prepare your application code for production.
  - When you build your application, Next.js will transform your code into production-optimized files ready to be deployed to servers and consumed by users.
  - These files include:
    - HTML files for statically generated pages
    - JavaScript code for rendering pages on the server
    - JavaScript code for making pages interactive on the client
    - CSS files
- Runtime (or request time) refers to the period of time **when your application runs in response to a user’s request**, after your application has been built and deployed.

## Client and Server

In the context of web applications...

- **Client** refers to **the browser on a user’s device that sends a request to a server for your application code**. It then turns the response it receives from the server into an interface the user can interact with.
- **Server** refers to the computer in a data centre that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.

## What is Rendering?

There is an unavoidable unit of work to **convert the code you write in React into the HTML representation of your UI**. This process is called **rendering**.

- Rendering can take place on the server or on the client. It can happen either ahead of time at build time, or on every request at runtime.
- With Next.js, three types of rendering methods are available: **Server-Side Rendering, Static Site Generation, and Client-Side Rendering.**
  - The beauty of Next.js is that you can choose the most appropriate rendering method for your use case on a page-by-page basis, whether that's Static Site Generation, Server-side Rendering, or Client-Side Rendering.
  - Server-Side Rendering and Static Site Generation are also referred to as **Pre-Rendering** because the fetching of external data and transformation of React components into HTML happens **before** the result is sent to the client.

### Client-Side Rendering vs. Pre-Rendering

|||
|--|--|
|![](https://nextjs.org/static/images/learn/foundations/client-side-rendering.png)|![](https://nextjs.org/static/images/learn/foundations/pre-rendering.png)|

- In a **standard React application**, the browser receives an empty HTML shell from the server along with the JavaScript instructions to construct the UI. This is called client-side rendering because **the initial rendering work happens on the user's device.**
  - You can **opt to use client-side rendering for specific components** in your Next.js application by choosing to fetch data with React’s `useEffect()` or a **data fetching hook** such as `useSWR`.
- In contrast, **Next.js pre-renders every page by default**.
  - Pre-rendering means the HTML is generated in advance, on a server, instead of having it all done by JavaScript on the user's device.
- In practice, this means that for a fully client-side rendered app, the user will see a blank page while the rendering work is being done. Compared to a pre-rendered app, where the user will see the constructed HTML.

### Server-Side Rendering

- With server-side rendering, **the HTML of the page is generated on a server for each request**.
- The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client.
- On the client, the HTML is used to show a fast non-interactive page, while **React uses the JSON data and JavaScript instructions to make components interactive** (for example, attaching event handlers to a button). This process is called **hydration**.
- In Next.js, you can opt to server-side render pages by using `getServerSideProps`.- Note: React 18 and Next 12 introduce an alpha version of **React server components**.
  - Server components are **completely rendered on the server and do not require client-side JavaScript to render**.
  - In addition, server components **allow developers to keep some logic on the server and only send the result of that logic to the client.**
  - This reduces the bundle size sent to the client and improves client-side rendering performance.

### Static Site Generation

- With Static Site Generation, the HTML is generated on the server, but unlike server-side rendering, **there is no server at runtime.** Instead, **content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request**.
- In Next.js, you can opt to statically generate pages by using `getStaticProps`.
- Note: You can use **Incremental Static Regeneration** to create or update static pages **after you’ve built your site**. This means you **do not have to rebuild your entire site if your data changes**.


## Where your application code is stored and run once it’s deployed to the network?

**Content Delivery Network**

- CDNs store static content (such as HTML and image files) in multiple locations around the world and are placed between the client and the origin server. When a new request comes in, the closest CDN location to the user can respond with the cached result.
- This reduces the load on the origin because the computation doesn’t have to happen on each request. It also makes it faster for the user because the response comes from a location geographically closer to them.
- In Next.js, since pre-rendering can be done ahead of time, CDNs are well suited to store the static result of the work - making content delivery faster.

**The Edge**

- The Edge is a generalized concept for **the fringe (or edge) of the network, closest to the user**.
- CDNs could be considered part of "the Edge" because they store static content at the fringe (edge) of the network.
- Similar to CDNs, Edge servers are distributed to multiple locations around the world. But unlike CDNs, which store static content, **some Edge servers can run small snippets of code.** This means both caching and code execution can be done at the Edge closer to the user.
- By moving some work that was traditionally done client-side or server-side to the Edge, you can make your application more performant because it reduces the amount of code sent to the client, and part of the user's request does not have to go all the way back to the origin server - thus reducing latency.
- In Next.js, you can run code at the Edge with Middleware, and soon with React Server Components.

## Pages in Next.js

- In Next.js, **a page is a React Component** exported from a file in the `pages` directory.
- Pages are **associated with a route based on their file name**. For example, in development:
  - `pages/index.js` is associated with the `/` route.
  - `pages/posts/first-post.js` is associated with the `/posts/first-post` route.
- This is how you can create different pages in Next.js. Simply create a JS file under the `pages` directory, and the path to the file becomes the URL path.

## Link Component

- In Next.js, you can use the `Link` Component (with `import Link from 'next/link';`)to link between pages in your application.
- `<Link>` allows you to do client-side navigation and accepts **props** that give you better control over the navigation behavior.
- The Link component is similar to using `<a>` tags, but instead of `<a href="...">`, you use `<Link href="...">`.
- The Link component enables **client-side navigation** between two pages in the same Next.js app.
  - Client-side navigation means that **the page transition happens using JavaScript, which is faster than the default navigation done by the browser**.
  - E.g. When you click on the links to go back and forth between the two pages, the browser does not load the full page.

## Code splitting and prefetching

- Next.js does code splitting automatically, so each page only loads what’s necessary for that page. That means when the homepage is rendered, the code for other pages is not served initially. This ensures that the homepage loads quickly even if you have hundreds of pages.
- Only loading the code for the page you request also means that pages become isolated. If a certain page throws an error, the rest of the application would still work.
- Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, **Next.js automatically prefetches the code for the linked page in the background.** By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant.

## Layout

- Layout component which will be shared across all pages.
- Can be used with CSS

## Assets

- Next.js can serve static assets, like images, under the top-level `public` directory.
- Files inside public can be referenced from the root of the application similar to pages.
- The `public` directory is also useful for `robots.txt`, Google Site Verification, and any other static assets.


### Image Component

- `next/image` is an extension of the HTML `<img>` element, Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it.
- This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.
- Next.js optimizes images on-demand, as users request them.
  - Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.
- Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
- Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.

## Metadata

What if we wanted to modify the metadata of the page, such as the `<title>` HTML tag?

- You can use the `import Head from 'next/head';` e.g. `Head` component

## Third-Party JavaScript

- Use `import Script from 'next/script';` e.g. `Script` component
- optionally you could add it to Head component with `script` tag. Although this approach works, including scripts in this manner does not give a clear idea of when it would load with respect to the other JavaScript code fetched on the same page. If a particular script is render-blocking and can delay page content from loading, this can significantly impact performance.

## CSS Modules

- CSS modules allow you to l**ocally scope CSS at the component-level by automatically creating unique class names**.
  - This allows you to use the same CSS class name in different files without worrying about class name collisions.

- In addition to CSS modules, you can style your Next.js application in a variety of ways, including:
  - Sass which allows you to import `.css` and `.scss` files.
  - PostCSS libraries like Tailwind CSS.
  - CSS-in-JS libraries such as styled-jsx, styled-components, and emotion

- CSS module automatically generates unique class names. As long as you use CSS Modules, you don’t have to worry about class name collisions.
- Next.js’s code splitting feature works on CSS Modules as well. It ensures the minimal amount of CSS is loaded for each page. This results in smaller bundle sizes.
- CSS Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js


## Global Styles

- If you want some CSS to be loaded by every page, Next.js has support to load global CSS to your application, create a file called `pages/_app.js`
- The default export of _app.js is a top-level React component that wraps all the pages in your application. You can use this component to keep state when navigating between pages, or to add global styles
- You can place the global CSS file anywhere and use any name. But in Next.js, you can only load the global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
  - The reason that global CSS can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.

## CSS utility class

- Create a set of CSS utility classes (for text styles) that can be re-used across multiple components.
- You can reuse these utility classes throughout your application, and you may even use utility classes in your global.css file. Utility classes refer to an approach of writing CSS selectors rather than a method (e.g. global styles, CSS modules, Sass, etc).
- Keyword: [utility-first CSS](https://tailwindcss.com/docs/utility-first)


## Styling Tips

- Check [NextJS css doc](https://nextjs.org/docs/basic-features/built-in-css-support)
- Using clsx library to toggle classes
  - clsx is a simple library that lets you toggle class names easily.
- [Customizing PostCSS Config](https://nextjs.org/docs/advanced-features/customizing-postcss-config)
  - Out of the box, with no configuration, Next.js compiles CSS using PostCSS.
  - To customize PostCSS config, you can create a top-level file called `postcss.config.js`. This is useful if you're using libraries like Tailwind CSS.
- Configuring content sources by specifying the content option on `tailwind.config.js`
  - [Example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)
- Using Sass
  - Sass is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more. It's translated to well-formatted, standard CSS using the command line tool or a plugin for your build system.
  - Out of the box, Next.js allows you to import Sass using both the `.scss` and `.sass` extensions.
  - You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

## Pre-rendering

- By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.
- Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called **hydration**.)

|||
|--|--|
|![](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)|![](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)|


### Two Forms of Pre-rendering

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

- Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
- Server-side Rendering is the pre-rendering method that generates the HTML on each request.
- In development mode (when you run `npm run dev`), pages are pre-rendered on every request. This also applies to Static Generation to make it easier to develop. When going to production, Static Generation will happen once, at build time, and not on every request.

|||
|--|--|
|![](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)|![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)|

When to Use Static Generation v.s. Server-side Rendering?

- You should ask yourself: **"Can I pre-render this page ahead of a user's request?"** If the answer is yes, then you should choose Static Generation.
  - We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.
  - You can use Static Generation for many types of pages, including:
    - Marketing pages
    - Blog posts
    - E-commerce product listings
    - Help and documentation

- On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request.
  - Maybe your page shows **frequently updated data**, and the page content **changes on every request**.
  - In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date.
  - **Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.**




### Per-page Basis

Next.js lets you choose which pre-rendering form to use for each page.

- You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

### Static Generation with Data

- Static Generation can be done with and without data.
- For some pages, you might not be able to render the HTML without first fetching some external data. Maybe you need to access the **file system, fetch external API, or query your database** at build time.
- Next.js supports this case — Static Generation with data — out of the box.
- How does it work? Well, in Next.js, when you export a page component, you can also export an async function called `getStaticProps`
  - Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”



```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

![](https://nextjs.org/static/images/learn/data-fetching/index-page.png)


## Server side rendering with Data

![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png)

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

- Because `getServerSideProps` is called at request time, its parameter (`context`) contains request specific parameters.
- You should use `getServerSideProps` only if you need to pre-render a page whose data must be fetched at request time.
  - Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

## Client-side Rendering

![](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

- If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):
- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
- This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO (search engine optimization) is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.
- SWR: Next.js team has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more.

```js
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## Side note: use `gray-matter` to parse meta data for your markdown

- In the example, markdown file has a metadata section at the top containing title and date, "YAML Front Matter", which can be parsed using a library called gray-matter.
  - You can install through `npm install gray-matter`


## Page path depends on external data

![](https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png)

- Page **content** depends on external data? We used getStaticPr`ops to fetch required data to render the index page.
- Page **path** depends on external data? Dynamic URLs in Next.js.
- Pages that begin with `[` and end with `]` are dynamic routes in Next.js.

![](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

- `[id].js` file might contain:

```js
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

## Side note: use `remark` and `remark-html` to generate markdown content

- `npm install remark remark-html`
- Follow [the tutorial](https://nextjs.org/learn/basics/dynamic-routes/render-markdown) ... [To learn more] but the interesting part is the async/await in js

```js
export async function getPostData(id) { // need to declare async for below await
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

and

```js
export async function getStaticProps({ params }) {
  // need the await to receive the future from the async function
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
```

## Creating API Routes

API Routes let you create an API endpoint inside a Next.js app. You can do so by creating a function inside the pages/api directory that has the following format:

```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

- `req `is an instance of `http.IncomingMessage`, plus some pre-built middlewares.
- `res` is an instance of `http.ServerResponse`, plus some helper functions.