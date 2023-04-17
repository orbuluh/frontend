# Notes for reading [NextJS example code](https://app-dir.vercel.app/)

## Structure

- Side bar is defined under `#/ui/global-nav`
- Address bar is the bar on top of page `#/ui/address-bar`

- Note that `#` to indicate root directory is only worked because in `tsconfig.json`, it defines

```json
  "paths": {
    "#/*": ["./*"]
  },
```

## About `_app.tsx`

- The "_app.tsx" file in a Next.js project is used as the top-level component for each page of the application.
- It allows you to override the default App component that Next.js provides, which is responsible for initializing the pages with various features like global CSS, state management, and more.

- When you create an "_app.tsx" file in the pages directory of a Next.js project, it becomes the parent component for all pages in the application. This means that any component that you include in "_app.tsx" will be rendered on every page. This is useful for things like adding a common layout or navigation to all pages.
- Additionally, "_app.tsx" also allows you to control the page initialization process. For example, you can fetch data that's needed for all pages in the application and pass it down as props to the child components.
- Overall, "_app.tsx" is a powerful and important file in a Next.js project that provides a centralized location for configuring and customizing the behavior of your application.



## Snippet explaining 1

```js
className = {
  clsx(
  'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
    {
      'text-gray-400 hover:bg-gray-800': !isActive,
      'text-white': isActive,
    },
)}
```

Overall, this code is defining a flexible className for a React component that changes based on whether or not the component is active, using conditional logic and a utility function to concatenate the class names.

- Defining a className for a React component using the `clsx` utility function.
- The `clsx` function is used to concatenate class names conditionally based on the presence or absence of certain props.

The resulting `className` will have the following attributes:

- block: specifies that the element should be rendered as a block element
- rounded-md: specifies that the element should have a medium level of rounding at the corners
- px-3: specifies the padding on the x-axis (horizontal padding) of the element
- py-2: specifies the padding on the y-axis (vertical padding) of the element
- text-sm: specifies the font size of the text inside the element
- font-medium: specifies the font weight of the text inside the element as medium
- hover:text-gray-300: specifies the text color of the element when the mouse is hovering over it to be gray with a 300 shade
- text-gray-400 hover:bg-gray-800: specifies the text color of the element to be gray with a 400 shade and the background color to be gray with an 800 shade when the element is not active (isActive is false)
- text-white: specifies the text color of the element to be white when the element is active (isActive is true)

- The `text-*` colors are not specific to React, but are instead a part of CSS (Cascading Style Sheets), which is the styling language used to add visual styling to HTML and other markup languages. In CSS, the text-* prefix is used to specify the color of text.

## Whey 'metadata' is defined?

- By using metadata, you can ensure that each page or route in your app has a descriptive title and description that accurately reflects its content.
- Improved SEO: Search engines use the title and description of a page as a key factor in determining its relevance to a search query. By setting the title and description of a page dynamically based on its content, you can improve its chances of appearing in search engine results.
- Accessibility: Screen readers and other assistive technologies use the title and description of a page to provide information about the content to users who may have difficulty seeing or navigating the page. By setting the title and description dynamically, you can ensure that this information is always up-to-date and accurate.
- Metadata can be used in React to dynamically set the title and description of a page based on the content being displayed.

```js
```