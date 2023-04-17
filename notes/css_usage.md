# CSS usage

- while checking on some template website from Vercel/NextJS

---

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
```

- This code is setting some CSS styles for all HTML elements (`*` selector) and for the `html` and `body` elements.

- For all HTML elements (`*` selector):
  - box-sizing: border-box; sets the box-sizing property to border-box, which means that the width and height of an element will include its padding and border.
  - padding: 0; sets the padding property to 0 for all sides, which means that no extra space will be added inside the element.
  - margin: 0; sets the margin property to 0 for all sides, which means that no extra space will be added outside the element.

- For the html and body elements:
  - max-width: 100vw; sets the maximum width of the element to 100% of the viewport width, which means that the element will not be wider than the viewport.
  - overflow-x: hidden; hides the horizontal scrollbar if the content inside the element is wider than the viewport.

---

```css
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
```

- This is a CSS code that uses a `media` query to detect the user's preferred color scheme for their device or browser, and applies a specific style to the HTML element based on the detected preference.
- In this particular code, the `media` query checks for the prefers-color-scheme value of dark, which indicates that the user prefers a dark color scheme. If the query returns true, the CSS rule inside the curly braces will be applied, which sets the color-scheme property of the HTML element to dark.
- This can be useful for websites or web applications that want to offer a better user experience by adjusting their appearance to match the user's preference for light or dark color schemes.

---

```css
:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;

  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;

  --primary-glow: conic-gradient(
    from 180deg at 50% 50%,
    #16abff33 0deg,
    #0885ff33 55deg,
    #54d6ff33 120deg,
    #0071ff33 160deg,
    transparent 360deg
  );
  --secondary-glow: radial-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );

  --tile-start-rgb: 239, 245, 249;
  --tile-end-rgb: 228, 232, 233;
  --tile-border: conic-gradient(
    #00000080,
    #00000040,
    #00000030,
    #00000020,
    #00000010,
    #00000010,
    #00000080
  );

  --callout-rgb: 238, 240, 241;
  --callout-border-rgb: 172, 175, 176;
  --card-rgb: 180, 185, 188;
  --card-border-rgb: 131, 134, 135;
}
```

- Overall, this code block defines a variety of custom variables that can be used to style elements throughout the document.
  - The `:root` selector refers to the root element of the document, which is usually the html element.
  - Defining variables in `:root` makes them global, so they can be used throughout the document.

- The variables defined in this code block include:

  - --max-width: Sets the maximum width for elements.
  - --border-radius: Sets the border radius for elements.
  - --font-mono: Sets the font family for elements that use monospace font.
  - --foreground-rgb: Sets the foreground color for elements using an RGB value.
  - --background-start-rgb and --background-end-rgb: Set the start and end colors for a linear gradient used as the background.
  - --primary-glow and --secondary-glow: Set the values for two different gradients used for glow effects
  - --tile-start-rgb and --tile-end-rgb: Set the start and end colors for a linear gradient used for a tile effect.
  - --tile-border: Set the values for a conic gradient used for the border of tiles.
  - --callout-rgb and --callout-border-rgb: Set the background and border colors for callout elements.
  - --card-rgb and --card-border-rgb: Set the background and border colors for card elements.

---

```js
<div className="fixed top-0 z-10 flex w-full flex-col border-b border-yellow-00 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-gray-800">
```

- This is a snippet of code written in React that defines a `div` element with several class names assigned to it.

- fixed: sets the position property of the element to "fixed", which fixes the element's position relative to the browser window.
- top-0: positions the element at the top of its parent element with no top margin.
- z-10: sets the z-index property of the element to 10, which places it in front of elements with lower z-index values.
  - The z-index property controls the vertical stacking order of elements on a webpage.
  - When an element has a z-index of "auto", it is positioned in the default stacking order determined by the HTML structure of the page. This means that elements with higher z-index values will appear in front of elements with lower z-index values.
- flex: sets the display property of the element to "flex", which allows it to be laid out as a flexible container.
- w-full: sets the width property of the element to 100% of its parent element.
- flex-col: sets the flex-direction property of the element to "column", which aligns its child elements vertically.
- border-b: sets a bottom border for the element.
- border-yellow-00: sets the color of the border to yellow-00.
- bg-black: sets the background color of the element to black.
- lg:bottom-0: for large screens, positions the element at the bottom of its parent element with no bottom margin.
- lg:z-auto: for large screens, sets the z-index property of the element to "auto", which allows it to be positioned according to the default stacking order determined by the HTML structure of the page.
- lg:w-72: for large screens, sets the width property of the element to 72 units.
- lg:border-r: for large screens, sets a right border for the element.
- lg:border-gray-800: for large screens, sets the color of the border to gray-800.

